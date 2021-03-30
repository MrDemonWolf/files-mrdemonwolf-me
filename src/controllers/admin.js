const path = require('path');
const fs = require('fs-extra');
const { customAlphabet } = require('nanoid/async');
const moment = require('moment');
const filesize = require('filesize');
const filesizeParser = require('filesize-parser');
const normalizeUrl = require('normalize-url');

const sendgrid = require('../config/sendgrid');

const urlFriendyAlphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Load MongoDB models.
 */
const User = require('.././models/User');
const Upload = require('.././models/Upload');
const Token = require('.././models/Token');
const Link = require('.././models/Link');

/**
 * Load vaildation middleware
 */
const isEmpty = require('../validation/isEmpty');

/**
 * Load email templates
 */
const AdminCreateUserActivation = require('../emails/AdminCreateUserActivation');
const AdminCreateUser = require('../emails/AdminCreateUser');

/**
 * Edit user Controller - Allows admins to update users accounts.
 */
exports.postUser = async (req, res) => {
  try {
    const {
      username,
      email,
      role,
      password,
      verified,
      emailVerified,
      sendEmail
    } = req.body;

    const newUser = new User({
      username,
      email,
      role,
      password,
      isVerified: verified
    });
    if (sendEmail && !emailVerified) {
      const emailVerificationToken = customAlphabet(urlFriendyAlphabet, 32);
      // TODO send a email here
      newUser.emailVerified = false;
      newUser.emailVerificationToken = await emailVerificationToken();
      newUser.emailVerificationTokenExpire = moment().add('3', 'h');

      // Setups the email which is sent to the user.
      const emailTemplate = AdminCreateUserActivation(
        newUser.emailVerificationToken,
        password
      );

      const msg = {
        to: newUser.email,
        from: `${process.env.EMAIL_FROM} <noreply@${process.env.EMAIL_DOMAIN}>`,
        subject: `New account created on ${process.env.TITLE}`,
        html: emailTemplate.html
      };

      // If testing mode then don't send the email.
      if (process.env.NODE_ENV !== 'test') await sendgrid.send(msg);
    }

    if (sendEmail && emailVerified) {
      // Setups the email which is sent to the user.
      const emailTemplate = AdminCreateUser(password);

      const msg = {
        to: newUser.email,
        from: `${process.env.EMAIL_FROM} <noreply@${process.env.EMAIL_DOMAIN}>`,
        subject: `New account created on ${process.env.TITLE}`,
        html: emailTemplate.html
      };

      // If testing mode then don't send the email.
      if (process.env.NODE_ENV !== 'test') await sendgrid.send(msg);
    }

    await newUser.save();
    req.flash('success', `${newUser.username} has been created`);
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Edit user Controller - Allows admins to update users accounts.
 */
exports.putEditUser = async (req, res) => {
  try {
    const {
      username, email, role, newPassword
    } = req.body;

    const user = await User.findOne({ slug: req.params.slug });

    // eslint-disable-next-line prefer-const
    let updatedInfomation = {};

    // Allow owner to edit all.
    if (req.user.role === 'owner') {
      if (user.username !== username) {
        updatedInfomation.username = username;
        user.username = username;
      }
      // Check if streamer mode is enabled
      // This is so it will skip if they are in streamer mode.
      if (!req.user.streamerMode) {
        if (user.email !== email) {
          updatedInfomation.email = email;
          user.email = email;
        }
      }
      if (user.role !== role && role !== undefined) {
        updatedInfomation.role = role;
        user.role = role;
      }
      // If the new password is entered it will change the password
      if (!isEmpty(newPassword)) {
        updatedInfomation.password = newPassword;
        user.password = newPassword;
      }
    }

    if (req.user.role === 'admin') {
      if (user.username !== username) {
        updatedInfomation.username = username;
        user.username = username;
      }
      // Check if streamer mode is enabled
      // This is so it will skip if they are in streamer mode.
      if (!req.user.streamerMode) {
        if (user.email !== email) {
          updatedInfomation.email = email;
          user.email = email;
        }
      }
    }

    await user.save();
    if (isEmpty(updatedInfomation)) {
      req.flash('error', "You didn't change any of the user infomation.");
      return res.redirect(`/admin/users/edit/${user.slug}`);
    }
    req.flash('success', 'User has been updated.');
    res.redirect(`/admin/users/${user.slug}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Toggle users streamer mode Controller - Allows admins to update users streamer mode status.
 */
exports.putStreamerMode = async (req, res) => {
  try {
    const { slug } = req.params;
    const boolean = req.params.boolean === 'true';

    // Toggle streamer mode
    await User.findOneAndUpdate(
      {
        slug
      },
      {
        streamerMode: boolean
      },
      { $safe: true }
    );
    res.json({
      message: `Streamer mode has been ${
        !boolean ? 'disabled' : 'enabled'
      } for this user`
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Toggle users email verified Controller - Allows admins to update users email verified status.
 */
exports.putEmailVerified = async (req, res) => {
  try {
    const { slug } = req.params;

    const boolean = req.params.boolean === 'true';

    // Toggle email verifyied
    if (boolean) {
      const emailVerificationToken = customAlphabet(urlFriendyAlphabet, 32);
      // Set the token and the expire date.
      await User.findOneAndUpdate(
        {
          slug
        },
        {
          emailVerified: false,
          emailVerificationToken: await emailVerificationToken(),
          emailVerificationTokenExpire: moment().add('3', 'h')
        },
        { $safe: true, $upsert: true }
      );
    } else {
      await User.findOneAndUpdate(
        {
          slug
        },
        {
          $set: {
            emailVerified: true
          },
          $unset: {
            emailVerificationToken: undefined,
            emailVerificationTokenExpire: undefined
          }
        },
        { $safe: true }
      );
    }

    res.json({
      message:
        boolean === 'false'
          ? 'User must now verify there email before they can login.'
          : 'User can now login even if they did not verify there email.'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Toggle users verified Controller - Allows admins to update users verified status.
 */

exports.putVerified = async (req, res) => {
  try {
    const { slug } = req.params;

    const boolean = req.params.boolean === 'true';

    await User.findOneAndUpdate(
      {
        slug
      },
      {
        isVerified: boolean
      },
      { $safe: true, $upsert: true }
    );

    res.json({
      message: boolean ? 'User is now a verified.' : 'User is now a unverified.'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Delete users mfa Controller - Allows admins to update users mfa.
 */
exports.deleteUserMFA = async (req, res) => {
  try {
    // Remove another users MFA
    await User.findOneAndUpdate(
      {
        slug: req.params.slug
      },
      {
        $set: {
          mfa: false
        },
        $unset: {
          mfaSecret: undefined
        }
      },
      { $safe: true }
    );
    res.json({
      message: 'MFA has been disabled for this user.'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Upoloads lising mini API Controller- Takes data from lib and returns results.
 */
exports.getUploadListData = async (req, res) => {
  try {
    // Simple query params used by table to sort,limit, and offet.
    const sort = req.query.order === 'asc' ? 1 : -1;
    const limit = parseFloat(req.query.limit);
    const offset = parseFloat(req.query.offset);

    const uploadsData = await Upload.find({})
      .sort({ uploadedAt: sort })
      .limit(limit)
      .skip(offset)
      .select(
        'uploaded uploadedAt name fileName size type fileExtension uploader'
      )
      .populate({
        path: 'uploader',
        select: 'username isVerified role slug'
      });

    // eslint-disable-next-line prefer-const
    let uploads = [];
    let id = 0;
    // Creates uploadsData object which is used to return for the table.
    uploadsData.map(data => {
      uploads.push({
        id: (id += 1),
        name: data.name,
        fileName: data.fileName,
        fileExtension: data.fileExtension,
        type: data.type,
        size: data.size,
        uploadedAt: data.uploadedAt,
        uploader: data.uploader.username,
        slug: data.uploader.slug,
        isVerified: data.uploader.isVerified
      });
    });

    const total = await Upload.countDocuments({
      uploader: req.user.id
    });

    res.json({
      total,
      rows: uploads
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Delete upload mini API - Removes a file from database and filesystem.
 */
exports.deleteSingleUpload = async (req, res) => {
  try {
    const { uploadedFile } = req.params;

    // Gets the file ext and file name.
    const uploadedFileExt = path.extname(uploadedFile);
    const uploadedFileName = uploadedFile.replace(uploadedFileExt, '');

    // Creates the file path
    const uploadedFilePath = `${path.join(
      __dirname,
      '../public'
    )}/u/${uploadedFile}`;

    // Removes the file from the database
    const upload = await Upload.findOneAndRemove({
      fileName: uploadedFileName
    });

    if (!upload) {
      if (req.user.streamerMode) {
        return res.status(404).json({
          message: `<strong>${uploadedFileName.substring(
            0,
            3
          )}*********************</strong> was not found.`,
          status: 404
        });
      }
      return res.status(404).json({
        message: `<strong>${uploadedFileName}</strong> was not found.`,
        status: 404
      });
    }
    // Removes the file form the disk
    await fs.remove(uploadedFilePath);
    if (req.user.streamerMode) {
      return res.json({
        message: `<strong>${uploadedFileName.substring(
          0,
          3
        )}*********************</strong> has been deleted.`,
        status: 200
      });
    }
    res.json({
      message: `<strong>${uploadedFileName}</strong> has been deleted.`,
      status: 200
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Upoloads lising mini API Controller- Takes data from lib and returns results.
 */
exports.getUserListData = async (req, res) => {
  try {
    // Simple query params used by table to sort,limit, and offet.
    // Plus with a username and email serach.
    const sort = req.query.order === 'asc' ? 1 : -1;
    const limit = parseFloat(req.query.limit);
    const offset = parseFloat(req.query.offset);
    const search = req.query.search !== undefined && !isEmpty(req.query.search);

    const userSelect =
      'username slug email createdAt role emailVerified newEmail streamerMode isVerified lastLogin lastLoginIP isBanned isSuspended';

    let userData = [];

    if (search) {
      userData = await User.find({ $text: { $search: req.query.search } })
        .sort({ createdAt: sort })
        .limit(limit)
        .skip(offset)
        .select(userSelect);
    } else {
      userData = await User.find({})
        .sort({ createdAt: sort })
        .limit(limit)
        .skip(offset)
        .select(userSelect);
    }

    const users = [];
    let id = 0;

    // Creates userData object to return to the table.
    userData.map(data => {
      users.push({
        id: (id += 1),
        username: data.username,
        slug: data.slug,
        email: data.email,
        role: data.role,
        emailVerified: data.emailVerified,
        newEmail: data.newEmail,
        createdAt: data.createdAt,
        streamerMode: data.streamerMode,
        isVerified: data.isVerified,
        isBanned: data.isBanned,
        isSuspended: data.isSuspended,
        suspendedReason: data.suspendedReason,
        suspendedExpire: data.suspendedExpire,
        lastLogin: data.lastLogin
      });
    });

    const total = await User.countDocuments({});

    res.json({
      total,
      rows: users
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Delete Upload in gallery - Removes a file from database and filesystem.
 */
exports.deleteGallerySingleUpload = async (req, res) => {
  try {
    const { uploadedFile } = req.params;

    // Gets the file ext and file name
    const uploadedFileExt = path.extname(uploadedFile);
    const uploadedFileName = uploadedFile.replace(uploadedFileExt, '');

    // Gets the file path
    const uploadedFilePath = `${path.join(
      __dirname,
      '../public'
    )}/u/${uploadedFile}`;

    // Removes upload from the database
    const upload = await Upload.findOneAndRemove({
      fileName: uploadedFileName
    });

    if (!upload) {
      if (req.user.streamerMode) {
        req.flash(
          'error',
          `<strong>${uploadedFileName.substring(
            0,
            3
          )}*********************</strong> was not found.`
        );
        return res.redirect('/admin/gallery');
      }
      req.flash('error', `<strong>${uploadedFileName}</strong> was not found.`);
      return res.redirect('/admin/gallery');
    }
    // Removes upload from disk
    await fs.remove(uploadedFilePath);
    if (req.user.streamerMode) {
      req.flash(
        'success',
        `
        <strong>${uploadedFileName.substring(
    0,
    3
  )}*********************</strong> has been deleted.`
      );
      return res.redirect('/admin/gallery');
    }
    req.flash(
      'success',
      `<strong>${uploadedFileName}</strong> has been deleted.`
    );
    res.redirect('/admin/gallery');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Delete all uploads for all users - Removes all file from database and filesystem that users have uploaded..
 */
exports.deleteAllUploads = async (req, res) => {
  try {
    // Finds all the uploads
    const uploads = await Upload.find({});

    // If none then return that there is no uploaded files.
    if (uploads.length === 0) {
      req.flash('error', 'No files have been uploaded yet.');
      return res.redirect('/admin/uploads');
    }

    // Deletes uploads one by one.
    uploads.map(async data => {
      const uploadedFileExt = data.fileExtension;
      const uploadedFileName = data.fileName;

      const uploadedFilePath = `${path.join(
        __dirname,
        '../public'
      )}/u/${uploadedFileName + uploadedFileExt}`;

      await Upload.findOneAndRemove({
        fileName: uploadedFileName
      });
      await fs.remove(uploadedFilePath);
    });

    req.flash('success', 'All users uploads have been removed.');
    res.redirect('/admin/uploads');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Ban user Controller - Allows admins to ban users.
 */
exports.putBan = async (req, res) => {
  try {
    const { slug } = req.params;

    await User.findOneAndUpdate(
      { slug },
      {
        $set: {
          isBanned: true,
          isSuspended: false,
          role: 'user'
        },
        $unset: {
          suspendedExpire: undefined,
          suspendedReason: undefined
        }
      },
      {
        $safe: true
      }
    );
    res.json({ message: 'User has been banned.', status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Links lising mini API Controller- Takes data from lib and returns results.
 */
exports.getLinksListData = async (req, res) => {
  try {
    // Simple query params used by table to sort,limit, and offet.
    const sort = req.query.order === 'asc' ? 1 : -1;
    const limit = parseFloat(req.query.limit);
    const offset = parseFloat(req.query.offset);

    const search = req.query.search !== undefined && !isEmpty(req.query.search);

    const linksSelect =
      'url code clicks limit tags createdAt updatedAt creator';
    let linksData = [];

    const creatorSelect = 'username isVerified role slug -_id';

    if (search) {
      linksData = await Link.find({
        $text: { $search: req.query.search }
      })
        .populate({ path: 'creator', select: creatorSelect })
        .sort({ createdAt: sort })
        .limit(limit)
        .skip(offset)
        .select(linksSelect);
    } else {
      linksData = await Link.find({})
        .populate({ path: 'creator', select: creatorSelect })
        .sort({ createdAt: sort })
        .limit(limit)
        .skip(offset)
        .select(linksSelect);
    }

    // eslint-disable-next-line prefer-const
    let links = [];
    let id = 0;
    const promises = linksData.map(async data => {
      links.push({
        id: (id += 1),
        url: data.url,
        code: data.code,
        clicks: data.clicks,
        limit: data.limit,
        creator: data.creator,
        updatedAt: data.updatedAt,
        createdAt: data.createdAt,
        tags: data.tags
      });
    });

    await Promise.all(promises);

    const total = await Link.countDocuments({ creator: req.user.id });

    res.json({
      total,
      rows: links
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Edit another users link - Lets admins edit the users link to fix and or review.
 */
exports.putLink = async (req, res) => {
  try {
    const {
      code, tags, limit, url
    } = req.body;

    const link = await Link.findOne({ code: req.params.code });

    if (!link) {
      return res.status(404).send('Not found.');
    }

    link.code = code;
    link.tags = tags;
    link.limit = limit;
    link.url = normalizeUrl(url);

    await link.save();

    res.json({ message: 'You have updated the link', status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Delete links from a user - Remove one link from database.
 */
exports.deleteLink = async (req, res) => {
  try {
    const link = await Link.findOneAndRemove({ code: req.body.code });
    res.json({ message: `${link.code} has been removed`, status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Unban user Controller - Allows admins to unban users.
 */
exports.putUnban = async (req, res) => {
  try {
    const { slug } = req.params;

    await User.findOneAndUpdate(
      { slug },
      {
        $set: {
          isBanned: false,
          isSuspended: false
        },
        $unset: {
          suspendedExpire: undefined,
          suspendedReason: undefined
        }
      },
      {
        $safe: true
      }
    );
    res.json({ message: 'User has been unbanned.', status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Suspend user Controller - Allows admins to suspend users.
 */
exports.putSuspend = async (req, res) => {
  try {
    const { slug } = req.params;

    let suspendedExpire = moment();

    const { reason, expire, expireCustom } = req.body;

    switch (expire) {
      case '1':
        suspendedExpire = moment().add('24', 'hours');
        break;
      case '7':
        suspendedExpire = moment().add('7', 'days');
        break;
      case '30':
        suspendedExpire = moment().add('1', 'month');
        break;
      default:
        suspendedExpire = moment(expireCustom);
        break;
    }

    const user = await User.findOneAndUpdate(
      { slug },
      {
        isSuspended: true,
        isBanned: false,
        role: 'user',
        suspendedExpire,
        suspendedReason: reason
      },
      {
        $safe: true
      }
    );

    res.json({
      message: `${user.username} has been suspended for ${moment(
        suspendedExpire
      ).fromNow(true)}`,
      status: 200
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * unsuspended user Controller - Allows admins to unsuspend users.
 */
exports.putUnsuspend = async (req, res) => {
  try {
    const { slug } = req.params;

    await User.findOneAndUpdate(
      { slug },
      {
        $set: {
          isBanned: false,
          isSuspended: false
        },
        $unset: {
          suspendedExpire: undefined,
          suspendedReason: undefined
        }
      },
      {
        $safe: true
      }
    );
    res.json({ message: 'User has been unsuspended.', status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Delete a users account  - REmoves both all the users data such as tokens and uploaded data.
 */
exports.deleteUser = async (req, res) => {
  try {
    const { slug } = req.params;

    const user = await User.findOne({ slug });

    if (!user) {
      return res.status(404).json({ message: 'User not found', status: 404 });
    }

    // Loop uploads to delete one by one;

    const uploads = Upload.find({ uploader: user.id });

    uploads.map(async data => {
      const uploadedFileExt = data.fileExtension;
      const uploadedFileName = data.fileName;

      const uploadedFilePath = `${path.join(
        __dirname,
        '../public'
      )}/u/${uploadedFileName + uploadedFileExt}`;

      await Upload.findOneAndRemove({
        fileName: uploadedFileName
      });
      await fs.remove(uploadedFilePath);
    });

    const tokens = await Token.find({ user: user.id });
    tokens.map(async data => {
      await Token.findByIdAndDelete(data.id);
    });

    await User.findByIdAndDelete(user.id);

    res.json({ message: `${user.username} has been deleted`, status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Transfer Ownership Controller - Allows owner to move ownership.
 */
exports.postOwnership = async (req, res) => {
  try {
    const { slug } = req.body;
    const newOwner = await User.findOne({ slug });
    const oldOwner = await User.findById(req.user.id);

    newOwner.role = 'owner';
    oldOwner.role = 'admin';

    await newOwner.save();
    await oldOwner.save();
    req.flash(
      'success',
      `Ownership of the app has been transfered to ${newOwner.username}`
    );
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Upload logo Controller - Allows owner upload a custom logo for the app.
 */
exports.postUploadLogo = async (req, res) => {
  try {
    const { logo } = req.files;
    const filePath = path.join(
      __dirname,
      '../public/assets/images/custom/logo.png'
    );

    await logo.mv(filePath);

    res.json({
      success:
        'Logo has been uploaded.  Please allow few moments for it to update on the site.',
      initialPreview: [
        // initial preview thumbnails for server uploaded files if you want it displayed immediately after upload
      ],
      initialPreviewConfig: [
        // configuration for each item in initial preview
      ],
      initialPreviewThumbTags: [
        // initial preview thumbnail tags configuration that will be replaced dynamically while rendering
      ],
      append: true // whether to append content to the initial preview (or set false to overwrite)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', status: 500 });
  }
};

/**
 * Delete logo Controller - Allows owner revert/delete custom logo for the app.
 */
exports.deleteUploadLogo = async (req, res) => {
  try {
    const customLogo = path.join(
      __dirname,
      '../public/assets/images/custom/logo.png'
    );
    await fs.remove(customLogo);
    res.json({
      message: 'Logo has been reverted to default.',
      status: 200
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', status: 500 });
  }
};

/**
 * Upload Favicon Controller - Allows owner upload a custom logo for the app.
 */
exports.postUploadFavicon = async (req, res) => {
  try {
    const { favicon } = req.files;
    const filePath = path.join(
      __dirname,
      '../public/assets/images/custom/favicon.ico'
    );

    await favicon.mv(filePath);

    res.json({
      success:
        'Favicon has been uploaded.  Please allow few moments for it to update on the site.',
      initialPreview: [
        // initial preview thumbnails for server uploaded files if you want it displayed immediately after upload
      ],
      initialPreviewConfig: [
        // configuration for each item in initial preview
      ],
      initialPreviewThumbTags: [
        // initial preview thumbnail tags configuration that will be replaced dynamically while rendering
      ],
      append: true // whether to append content to the initial preview (or set false to overwrite)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', status: 500 });
  }
};

/**
 * Delete Favicon Controller - Allows owner revert/delete custom favicon for the app.
 */
exports.deleteUploadFavicon = async (req, res) => {
  try {
    const customFavicon = path.join(
      __dirname,
      '../public/assets/images/custom/favicon.ico'
    );

    await fs.remove(customFavicon);

    res.json({
      message: 'Favicon has been reverted to default.',
      status: 200
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', status: 500 });
  }
};

/**
 * Space Used Controller - Get's the amount of spaced used by uploads.
 */
exports.getSpaceUsed = async (req, res, next) => {
  try {
    const uploads = await Upload.find({}).select('size');
    const uploadsLength = uploads.length;
    // eslint-disable-next-line prefer-const
    let spaceUsedInBytes = 0;

    uploads.map(data => {
      spaceUsedInBytes += filesizeParser(data.size);
    });
    res.json({ data: filesize(spaceUsedInBytes), status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
