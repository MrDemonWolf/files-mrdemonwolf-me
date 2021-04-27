const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const logger = require('morgan');
const consola = require('consola');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const flash = require('express-flash');
const fileUpload = require('express-fileupload');
const MongoStore = require('connect-mongo');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const requestIp = require('request-ip');
const moment = require('moment');
const lusca = require('lusca');
const fs = require('fs-extra');
const cors = require('cors');
const winston = require('winston');
const expressWinston = require('express-winston');
const User = require('./models/User');

require('winston-daily-rotate-file');

/**
 * Load environment variables from the .env file, where API keys and passwords are stored.
 */
require('dotenv').config();

/**
 * Created Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true
});
const db = mongoose.connection;

/**
 * Setup host and port.
 */
app.set('host', process.env.IP || '127.0.0.1');
app.set('port', process.env.PORT || 8080);

/**
 * Serve Public Folder and bower components
 */
app.use(express.static(`${__dirname}/public`));
app.use(
  '/bower_components',
  express.static(path.join(__dirname, '../bower_components'))
);

/**
 * Set the view directory
 */
app.set('views', `${__dirname}/views`);

/**
 * Express configuration (compression, logging, body-parser,methodoverride)
 */
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(requestIp.mw());
app.use(flash());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');

const corsOptions = {
  origin: process.env.FULL_DOMAIN
};

switch (process.env.NODE_ENV) {
  case 'production ':
    app.use(logger('combined'));
    app.use(cors(corsOptions));
    break;
  case 'test':
    break;
  default:
    app.use(logger('dev'));
}

/**
 * Helmet - security for HTTP headers
 * Learn more at https://helmetjs.github.io/
 */
app.use(helmet());

/**
 * Express session configuration.
 */
// eslint-disable-next-line prefer-const
let sess = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 7 * 2,
    httpOnly: true
  }, // Two weeks in milliseconds
  name: 'sessionId',
  store: new MongoStore({ mongoUrl: mongoose.connection._connectionString })
};
app.use(session(sess));

/**
 * Prod settings
 */
if (!process.env.NODE_ENV === 'development') {
  app.enable('trust proxy');
  app.set('trust proxy', 1);
  // serve secure cookies
  sess.cookie.secure = true;
  // Compression
  app.use(compression());
}

/**
 * Passport
 */
app.use(passport.initialize());
require('./config/passport')(passport);

app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(null, user);
  });
});

/**
 * Express locals
 */
app.use(async (req, res, next) => {

  // NodeJS Lib
  res.locals.moment = moment;
  // Pass req infomation to the locals
  res.locals.currentUser = req.user;
  res.locals.currentPath = req.path;
  // Custom ENV
  res.locals.siteTitle = process.env.TITLE;
  res.locals.siteDesc = process.env.DESC;
  res.locals.sitePowered = `Uploader Powered by ${process.env.TITLE}`;
  res.locals.siteURL = process.env.FULL_DOMAIN;
  res.locals.footerText = process.env.FOOTER_TEXT;
  res.locals.footerLink = process.env.FOOTER_LINK;
  res.locals.credit = process.env.CREDIT === 'true';
  res.locals.showVersion = process.env.SHOW_VERSION === 'true';
  res.locals.signups = process.env.SIGNUPS === 'true';
  res.locals.owner = process.env.OWNER === 'true';
  res.locals.signupTerms = process.env.SIGNUP_TERMS === 'true';
  res.locals.version =
    process.env.NODE_ENV === 'production'
      ? process.env.npm_package_version
      : `${process.env.npm_package_version}-dev`;
  // Pass flash to locals
  res.locals.info = req.flash('info');
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');

  res.locals.logo = (await fs.existsSync(
    `${__dirname}/public/assets/images/custom/logo.png`
  ))
    ? '/assets/images/custom/logo.png'
    : '/assets/images/logo.png';

  res.locals.favicon = (await fs.existsSync(
    `${__dirname}/public/assets/images/custom/favicon.ico`
  ))
    ? '/assets/images/custom/favicon.ico'
    : '/favicon.ico';

  res.locals.currentYear = new Date().getFullYear();
  next();
});
/**
 * Express Fileupload
 */
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, '../tmp'),
    safeFileNames: true,
    preserveExtension: true,
    limits: {
      fileSize: process.env.UPLOAD_LIMIT || 100000000
    },
    abortOnLimit: true
  })
);

/**
 * CSRF
 */
app.use((req, res, next) => {
  if (
    req.path === '/api' ||
    RegExp('/api/.*').test(req.path) ||
    process.env.NODE_ENV === 'test'
  ) {
    // Multer multipart/form-data handling needs to occur before the Lusca CSRF check.
    // eslint-disable-next-line no-underscore-dangle
    res.locals._csrf = '';
    next();
  } else {
    lusca.referrerPolicy('same-origin');
    lusca.csrf()(req, res, next);
  }
});

/**
 * Log
 */
if (process.env.LOGGER === 'true') {
  const transport = new winston.transports.DailyRotateFile({
    filename: 'logs/access-log%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  });

  app.use(
    expressWinston.logger({
      transports: [transport],
      meta: true, // optional: control whether you want to log the meta data about the request (default to true)
      msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
      expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
      colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
      ignoreRoute(req, res) {
        return false;
      } // optional: allows to skip some log messages based on request and/or response
    })
  );
}

/**
 * Limiters - this is rate limiters per API or other requests.
 */
const accountLimiter = require('./limiters/account');
const adminLimiter = require('./limiters/admin');
const linkLimiter = require('./limiters/link');

/**
 * Load middlewares
 */
const isLoggedin = require('./middleware/isLoggedin');
const isAlreadyAuth = require('./middleware/isAlreadyLoggedin');
const isAccounActivated = require('./middleware/isAccounActivated');
const isAdmin = require('./middleware/roleCheck/isAdmin');
const putEmailVerified = require('./middleware/admin/putEmailVerified');
const isOwner = require('./middleware/roleCheck/isOwner');
const isOwnerDisabled = require('./middleware/isOwner');
const isOwnerAccountDelete = require('./middleware/account/isOwner');
const isPasswordResetTokenVaild = require('./middleware/isPasswordResetTokenVaild');
const isDeleteAccountTokenVaild = require('./middleware/isDeleteAccountTokenVaild');
const isAccountActivationTokenVaild = require('./middleware/isAccountActivationTokenVaild');
const isEMailVerificationTokenVaild = require('./middleware/account/isEMailVerificationTokenVaild');
const isMfa = require('./middleware/isMfa');
const isBanned = require('./middleware/isBanned');
const isSuspended = require('./middleware/isSuspended');
const isBannedAPI = require('./middleware/api/isBanned');
const isSuspendedAPI = require('./middleware/api/isSuspended');
const deleteUserMFA = require('./middleware/admin/deleteUserMFA');
const putBan = require('./middleware/admin/putBan');
const putUnban = require('./middleware/admin/putUnban');
const putSuspend = require('./middleware/admin/putSuspend');
const putUnsuspend = require('./middleware/admin/putUnsuspend');
const putEditUser = require('./middleware/admin/putEditUser');
const deleteUser = require('./middleware/admin/deleteUser');
const postUploadLogo = require('./middleware/admin/postUploadLogo');
const deleteUploadLogo = require('./middleware/admin/deleteUploadLogo');
const postUploadFavicon = require('./middleware/admin/postUploadFavicon');
const deleteUploadFavicon = require('./middleware/admin/deleteUploadFavicon');
const isSignupsDisabled = require('./middleware/isSignupsDisabled');
const isConfigTokenVaild = require('./middleware/config/isTokenVaild');
const isLimitReached = require('./middleware/linkLimiter');
const isSignupTerms = require('./middleware/isSignupTerms');

/**
 * Load vaildation middleware
 */
const loginVaildation = require('./validation/login');
const signupVaildation = require('./validation/signup');
const adminNewUserVaildation = require('./validation/admin/newUser');
const forgotPasswordVaildation = require('./validation/forgot-password');
const resetPasswordVaildation = require('./validation/reset-password');
const accountRenameTokenVaildation = require('./validation/tokens/rename-token');
const accountCreateTokenVaildation = require('./validation/tokens/create-token');
const ResendActivationEmailVaildation = require('./validation/resend-activation');
const userUpdateVaildation = require('./validation/admin/userUpdate');
const suspendUserVaildation = require('./validation/admin/suspendUser');
const postOwnershipVaildation = require('./validation/admin/transferOwnership');
const configVaildation = require('./validation/config');
const putUploadVaildation = require('./validation/uploadUpdate');
const createLinkValidation = require('./validation/linkCreate');
/**
 * Primary app routes.
 */
const indexRoutes = require('./routes/index');
const termsRoutes = require('./routes/terms');
const linksRoutes = require('./routes/links');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const accountRoutes = require('./routes/account');
const tokensRoutes = require('./routes/tokens');
const galleryRoutes = require('./routes/gallery');
const viewRoutes = require('./routes/view');
const adminRoutes = require('./routes/admin');
const configRoutes = require('./routes/config');
const ownerController = require('./controllers/owner');
const indexController = require('./controllers/index');
const termsController = require('./controllers/terms');
const linksController = require('./controllers/links');
const authController = require('./controllers/auth');
const userController = require('./controllers/user');
const accountController = require('./controllers/account');
const tokensController = require('./controllers/tokens');
const galleryController = require('./controllers/gallery');
const adminController = require('./controllers/admin');
const configController = require('./controllers/config');

app.use(indexRoutes);
app.use('/terms', isSignupTerms, termsRoutes);

app.use('/view', viewRoutes);

app.get('/l/:link', isLimitReached, linksController.getLink);

app.put(
  '/edit',
  isLoggedin,
  isBannedAPI,
  isSuspendedAPI,
  putUploadVaildation,
  indexController.putUpload
);

app.get('/owner', isOwnerDisabled, ownerController.getOwner);

app.get('/owner/:token', isOwnerDisabled, ownerController.getOwnerToken);

app.get(
  '/upload-data',
  isLoggedin,
  isBannedAPI,
  isSuspendedAPI,
  indexController.getUploadListData
);

app.delete(
  '/upload-data/:uploadedFile',
  isLoggedin,
  isBannedAPI,
  isSuspendedAPI,
  indexController.deleteSingleUpload
);

app.use(authRoutes);

app.post(
  '/signup',
  isSignupsDisabled,
  signupVaildation,
  isAlreadyAuth,
  authController.postSignup
);

app.post(
  '/login',
  isAlreadyAuth,
  isAccounActivated,
  loginVaildation,
  isMfa,
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login'
  }),
  authController.postLogin
);

app.get('/logout', authController.getLogout);

app.use('/user', userRoutes);

app.get(
  '/user/activation/:token',
  isAccountActivationTokenVaild,
  userController.getActivation
);

app.get(
  '/user/delete-account/:token',
  isDeleteAccountTokenVaild,
  userController.deleteUser
);

app.post(
  '/user/forgot-password',
  forgotPasswordVaildation,
  userController.postPasswordForgot
);

app.post(
  '/user/reset-password/:token',
  isPasswordResetTokenVaild,
  resetPasswordVaildation,
  userController.postPasswordReset
);

app.post(
  '/user/resend-activation',
  ResendActivationEmailVaildation,
  userController.postResendActivationEmail
);

app.use('/account', isLoggedin, isBanned, isSuspended, accountRoutes);

app.put(
  '/account',
  isLoggedin,
  isBanned,
  isSuspended,
  accountController.putAccount
);

app.delete(
  '/account',
  isLoggedin,
  isBanned,
  isSuspended,
  isOwnerAccountDelete,
  accountController.deleteAccount
);
app.get(
  '/account/export',
  isLoggedin,
  isBanned,
  isSuspended,
  accountController.getExportData
);

app.get(
  '/account/email-verify/:token',
  isLoggedin,
  isBanned,
  isSuspended,
  isEMailVerificationTokenVaild,
  accountController.emailVeirfy
);

app.get(
  '/account/resend/email-verify',
  isLoggedin,
  isBanned,
  isSuspended,
  accountController.resendEmailVeirfy
);

app.put(
  '/account/streamer-mode/:boolean',
  isLoggedin,
  isBanned,
  isSuspended,
  accountController.putStreamerMode
);

app.post(
  '/account/mfa/setup',
  isLoggedin,
  isBannedAPI,
  isSuspendedAPI,
  accountController.postMfaSetup
);

app.post(
  '/account/mfa/setup/verify',
  isLoggedin,
  isBannedAPI,
  isSuspendedAPI,
  accountController.postMfaSetupVerify
);

app.delete(
  '/account/mfa',
  isLoggedin,
  isBannedAPI,
  isSuspendedAPI,
  accountController.deleteMFA
);

app.get(
  '/account/space-used',
  isLoggedin,
  isBannedAPI,
  isSuspendedAPI,
  accountLimiter.spaceUsed,
  accountController.getSpaceUsed
);

app.use('/tokens', isLoggedin, isBanned, isSuspended, tokensRoutes);

app.get(
  '/tokens-data',
  isLoggedin,
  isBannedAPI,
  isSuspendedAPI,
  tokensController.getTokenListData
);

app.post(
  '/tokens',
  isLoggedin,
  isBannedAPI,
  accountCreateTokenVaildation,
  tokensController.postToken
);

app.put(
  '/tokens/:token_id',
  isLoggedin,
  isBannedAPI,
  isSuspendedAPI,
  accountRenameTokenVaildation,
  tokensController.putToken
);

app.delete(
  '/tokens/:token_id',
  isLoggedin,
  isBannedAPI,
  isSuspendedAPI,
  tokensController.deleteToken
);

app.use('/links', isLoggedin, isBanned, isSuspended, linksRoutes);

app.get(
  '/links/code',
  isLoggedin,
  isBannedAPI,
  isSuspendedAPI,
  linkLimiter.codeGen,
  linksController.getLinkCode
);

app.post(
  '/links',
  isLoggedin,
  isBanned,
  isSuspended,
  createLinkValidation,
  linksController.postLink
);

app.put(
  '/links',
  isLoggedin,
  isBannedAPI,
  isSuspendedAPI,
  linksController.putLink
);

app.delete(
  '/links',
  isLoggedin,
  isBannedAPI,
  isSuspendedAPI,
  linksController.deleteLink
);

app.get(
  '/links-data',
  isLoggedin,
  isBannedAPI,
  isSuspendedAPI,
  linksController.getLinksListData
);

app.delete(
  '/all/uploads',
  isLoggedin,
  isBannedAPI,
  isSuspendedAPI,
  indexController.deleteAllUploads
);

app.delete(
  '/all/tokens',
  isLoggedin,
  isBannedAPI,
  isSuspendedAPI,
  tokensController.deleteAllTokens
);
app.use('/gallery', isLoggedin, isBanned, isSuspended, galleryRoutes);

app.delete(
  '/gallery/:uploadedFile',
  isLoggedin,
  isBannedAPI,
  isSuspendedAPI,
  galleryController.deleteSingleUpload
);
app.use('/config', isLoggedin, isBanned, isSuspended, configRoutes);

app.post(
  '/config',
  isLoggedin,
  isBanned,
  isSuspended,
  configVaildation,
  isConfigTokenVaild,
  configController.postConfig
);

app.use('/admin', isAdmin, adminRoutes);

app.get(
  '/admin/space-used',
  isAdmin,
  isSuspendedAPI,
  adminLimiter.spaceUsed,
  adminController.getSpaceUsed
);

app.delete('/admin/all/uploads', isAdmin, adminController.deleteAllUploads);

app.get('/admin/uploads-data', isAdmin, adminController.getUploadListData);

app.delete(
  '/admin/uploads/:uploadedFile',
  isAdmin,
  adminController.deleteSingleUpload
);
app.delete(
  '/admin/uploads/gallery/:uploadedFile',
  isAdmin,
  adminController.deleteGallerySingleUpload
);

app.put(
  '/admin/links/:code',
  isLoggedin,
  isAdmin,
  isBannedAPI,
  isSuspendedAPI,
  adminController.putLink
);

app.delete(
  '/admin/links',
  isLoggedin,
  isAdmin,
  isBannedAPI,
  isSuspendedAPI,
  adminController.deleteLink
);

app.get('/admin/links-data', isAdmin, adminController.getLinksListData);

app.get('/admin/users-data', isAdmin, adminController.getUserListData);

app.post(
  '/admin/users',
  isAdmin,
  adminNewUserVaildation,
  adminController.postUser
);

app.put(
  '/admin/users/edit/:slug',
  isAdmin,
  putEditUser,
  userUpdateVaildation,
  adminController.putEditUser
);

app.delete(
  '/admin/users/edit/:slug/mfa',
  isAdmin,
  deleteUserMFA,
  adminController.deleteUserMFA
);

app.put(
  '/admin/users/edit/:slug/streamer-mode/:boolean',
  isAdmin,
  adminController.putStreamerMode
);

app.put(
  '/admin/users/edit/:slug/email-verified/:boolean',
  isAdmin,
  putEmailVerified,
  adminController.putEmailVerified
);

app.put(
  '/admin/users/edit/:slug/verified/:boolean',
  isAdmin,
  adminController.putVerified
);

app.put('/admin/users/ban/:slug', isAdmin, putBan, adminController.putBan);

app.put(
  '/admin/users/unban/:slug',
  isAdmin,
  putUnban,
  adminController.putUnban
);

app.put(
  '/admin/users/suspend/:slug',
  isAdmin,
  putSuspend,
  suspendUserVaildation,
  adminController.putSuspend
);
app.put(
  '/admin/users/unsuspend/:slug',
  isAdmin,
  putUnsuspend,
  adminController.putUnsuspend
);
app.delete(
  '/admin/users/:slug',
  isAdmin,
  deleteUser,
  adminController.deleteUser
);

app.post(
  '/admin/settings/ownership',
  isLoggedin,
  isOwner,
  postOwnershipVaildation,
  adminController.postOwnership
);

app.post(
  '/admin/settings/logo',
  isLoggedin,
  isOwner,
  postUploadLogo,
  adminController.postUploadLogo
);

app.delete(
  '/admin/settings/logo',
  isLoggedin,
  isOwner,
  deleteUploadLogo,
  adminController.deleteUploadLogo
);

app.post(
  '/admin/settings/favicon',
  isLoggedin,
  isOwner,
  postUploadFavicon,
  adminController.postUploadFavicon
);

app.delete(
  '/admin/settings/favicon',
  isLoggedin,
  isOwner,
  deleteUploadFavicon,
  adminController.deleteUploadFavicon
);

app.put('/admin/settings/terms', isLoggedin, isOwner, termsController.putTerms);

/**
 * API routes.
 * This is the only one that will be split up in
 * the route files it self.  As it will be easyier to mange the versions
 */
const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);

/**
 * Handle 404 errors
 */
app.use((req, res, next) => {
  res.status(404);

  if (req.path === '/api' || RegExp('/api/.*').test(req.path)) {
    return res
      .status(404)
      .json({ error: 'Whoops, this resource or route could not be found' });
  }
  res.type('txt').send('Not found');
});

/**
 * Mongo and Express actions
 */
db.on('error', () => {
  consola.error(
    new Error('MongoDB connection error. Please make sure MongoDB is running.`')
  );
});
if (process.env.NODE_ENV !== 'test') {
  db.once('open', () => {
    consola.ready({
      message: 'Database',
      badge: true
    });
    app.listen(app.get('port'), () => {
      consola.ready({
        message: 'Web',
        badge: true
      });
      // Log infomation after everything is started.
      consola.log('----------------------------------------');
      consola.info(`Environment: ${app.get('env')}`);
      consola.info(`App URL: http://localhost:${app.get('port')}`);
      consola.log('----------------------------------------');
    });
  });
}

// Cloes connection to mongodb on exit.
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    consola.success(
      'Mongoose connection is disconnected due to application termination'
    );
    process.exit(0);
  });
});

module.exports = app;
