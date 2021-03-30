const { customAlphabet } = require('nanoid/async');
const moment = require('moment');
const sendgrid = require('../config/sendgrid');

const urlFriendyAlphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Load MongoDB models.
 */
const User = require('../models/User');

/**
 * Load Email Templates.
 */
const PasswordForgotEmail = require('../emails/PasswordForgot');
const PasswordResetEmail = require('../emails/PasswordReset');
const AccountActivationEmail = require('../emails/AccountActivation');

/**
 * Forgot password Controler- Takes a user email looks it up.
 * Sets a token and a expirely date then sends them a link in
 * there email with a aone time token to change the password.
 */
exports.postPasswordForgot = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      email
    });

    // TODO Send a email link to reset password
    // Set the token and the expire date.
    const token = customAlphabet(urlFriendyAlphabet, 24);
    const tokenExpire = moment().add('3', 'h');

    // Saves the token and expire date to the database
    user.passwordResetToken = await token();
    user.passwordResetTokenExpire = tokenExpire;

    await user.save();

    // Setups the email which is sent to the user.

    const emailTemplate = PasswordForgotEmail(user.passwordResetToken);

    const msg = {
      to: user.email,
      from: `${process.env.EMAIL_FROM} <noreply@${process.env.EMAIL_DOMAIN}>`,
      subject: `Reset your password on ${process.env.TITLE}`,
      html: emailTemplate.html
    };

    if (process.env.NODE_ENV !== 'test') await sendgrid.send(msg);

    req.flash(
      'success',
      'Please check your email for further instructions on recovering your password.'
    );
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Password reset Controler - After verifying the token is vaild.
 * Takes the users new password and comfirm password to check if they match
 * if they do then it will set it as there password plus link the IP to
 * the model and set the date.  Also sends them a email with IP details so
 * they know there password has been changed.
 */
exports.postPasswordReset = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findOne({
      passwordResetToken: req.params.token
    });

    // Sets the token and expire date to undfined which removes them from the database
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpire = undefined;

    // Sets the new account password
    user.password = password;
    // Adds a last password change date to database
    user.passwordChanged = moment();

    await user.save();

    // Setups the email which is sent to the user.
    // Which includes the IP used to changed the password so the user knows if it's theres or not.
    const emailTemplate = PasswordResetEmail(req.clientIp, req.ipInfo);

    const msg = {
      to: user.email,
      from: `${process.env.EMAIL_FROM} <noreply@${process.env.EMAIL_DOMAIN}>`,
      subject: `Password changed on ${process.env.TITLE}`,
      html: emailTemplate.html
    };

    if (process.env.NODE_ENV !== 'test') await sendgrid.send(msg);

    req.flash('success', 'Password has been changed.  You may now login.');
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Account Activation Controler - Checks the token and if it's vaild
 * activate the users account
 *
 * @param token
 * Account Activation Token
 */
exports.getActivation = async (req, res, next) => {
  try {
    const user = await User.findOne({
      emailVerificationToken: req.params.token
    })
      .where('emailVerificationTokenExpire')
      .gt(moment());

    // If no user that needs to be activated then it will ask them to resend
    if (!user) {
      req.flash(
        'error',
        'Your account activation token is either expired or your account is already activated'
      );
      res.redirect('/user/resend-activation');
    } else {
      // Sets all the data to undfined which removes it from the database
      user.emailVerificationToken = undefined;
      user.emailVerificationTokenExpire = undefined;
      user.emailVerified = true;
      await user.save();

      req.flash(
        'success',
        'Your account has been activated.  You may now login.'
      );
      res.redirect('/login');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Resend Account Activation Controler - Checks if the accunt is activated
 *  yet if not it will send a new email with new token
 *
 * @param token
 * Account Activation Token
 */
exports.postResendActivationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    // Set the token and the expire date.
    const token = await customAlphabet(urlFriendyAlphabet, 24);
    const tokenExpire = moment().add('3', 'h');

    // Sets the token and expire date in the database.
    user.emailVerificationToken = await token();
    user.emailVerificationTokenExpire = tokenExpire;
    await user.save();

    // Setups the email which is sent to the user.
    const emailTemplate = AccountActivationEmail(user.emailVerificationToken);

    const msg = {
      to: user.email,
      from: `${process.env.EMAIL_FROM} <noreply@${process.env.EMAIL_DOMAIN}>`,
      subject: `Activate your account on ${process.env.TITLE}`,
      html: emailTemplate.html
    };

    if (process.env.NODE_ENV !== 'test') await sendgrid.send(msg);

    req.flash(
      'success',
      'Please check your email for a new account activation email.'
    );
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Delete user account - Takes a token the user provides and if the email has not been verifyed yet.  It  will delete there whole account
 */
exports.deleteUser = async (req, res) => {
  try {
    await User.findOneAndRemove({ emailVerificationToken: req.params.token });
    req.flash('success', 'Your account has been deleted.');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
