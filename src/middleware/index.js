var middlewareObj = {};
const User = require('../models/user');
const Upload = require('../models/upload');
const Key = require('../models/key');
const md5 = require('js-md5');

middlewareObj.isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    req.flash('error', 'You must be admin.')
    res.redirect('/')
    return;
  }
  next();
}
middlewareObj.isActvation = (req, res, next) => {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (user && !user.accountActivated) {
      req.flash('error', `Your account needs to be activated still.  If you need to resend the activation email click <a href="/user/activate/resend">here</a>`)
      res.redirect('/login')
      return;
    }
    next();
  })
};

middlewareObj.isAlreadyLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/me')
    return
  }
  next();
};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You need to be logged in to do that!")
    res.redirect("/login")
    return
  }
  next();
};

// Uplaoder
middlewareObj.isAPIKeyVaild = (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'No API Key provided.'
      }
    });
  }
  let rawToken = token.split(" ").slice(1).toString();
  let tokenHash = md5(rawToken);
  Key.findOne({ hash: tokenHash }, (err, key) => {
    if (key === null) return res.status(401).json({
      success: false,
      error: {
        message: 'Invaid Key provided.'
      }
    });
    next();
  })
};

module.exports = middlewareObj;
