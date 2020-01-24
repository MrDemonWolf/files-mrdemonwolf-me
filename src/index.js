const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const logger = require('morgan');
const consola = require('consola');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const flash = require('express-flash');
const MongoStore = require('connect-mongo')(session);
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const helmet = require('helmet');
const expressip = require('express-ip');
const requestIp = require('request-ip');
const moment = require('moment');
const lusca = require('lusca');
const User = require('./models/User');

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
 * Serve Public Folder.
 */
app.use(express.static(`${__dirname}/public`));

/**
 * Set the view directory
 */
app.set('views', `${__dirname}/views`);

/**
 * Express configuration (compression, logging, body-parser,methodoverride)
 */
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(expressip().getIpInfoMiddleware);
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

if (!process.env.NODE_ENV === 'development') {
  app.use(logger('combined'));
} else {
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
  store: new MongoStore({ mongooseConnection: mongoose.connection })
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
app.use((req, res, next) => {
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
  res.locals.footerTitle = process.env.FOOTER_TITLE;
  res.locals.credit = process.env.CREDIT === 'true';
  res.locals.showVersion = process.env.SHOW_VERSION === 'true';
  res.locals.signups = process.env.SIGNUPS === 'true';
  res.locals.signupTerms = process.env.SIGNUP_TERMS === 'true';
  res.locals.version =
    process.env.NODE_ENV !== 'development' || process.env.NODE_ENV !== 'test'
      ? `${process.env.npm_package_version} dev`
      : process.env.npm_package_version;
  // Pass flash to locals

  res.locals.info = req.flash('info');
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');

  if (res.locals.error) {
    res.set('Error', true);
  }
  if (res.locals.info) {
    res.set('Info', true);
  }

  res.locals.currentYear = new Date().getFullYear();
  next();
});

/**
 * CSRF
 */
app.use((req, res, next) => {
  if (
    // req.path === '/api/v1' ||
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
 * Rate Limiter
 */
const limiter = rateLimit({
  windowMs: 1000 * 60, // 1 minutes
  max: 15 // Max of 15 requests
});

/**
 * Load middlewares
 */
const isLoggedin = require('./middleware/isLoggedin');
const isAlreadyAuth = require('./middleware/isAlreadyLoggedin');
const isAccounActivated = require('./middleware/isAccounActivated');
const isAdmin = require('./middleware/roleCheck/isAdmin');
const isPasswordResetTokenVaild = require('./middleware/isPasswordResetTokenVaild');
const isEMailVerificationTokenVaild = require('./middleware/account/isEMailVerificationTokenVaild');

/**
 * Load vaildation middleware
 */
const loginVaildation = require('./validation/login');
const signupVaildation = require('./validation/signup');
const forgotPasswordVaildation = require('./validation/forgot-password');
const resetPasswordVaildation = require('./validation/reset-password');
const accountRenameTokenVaildation = require('./validation/tokens/rename-token');
const accountCreateTokenVaildation = require('./validation/tokens/create-token');
const ResendActivationEmailVaildation = require('./validation/resend-activation');

/**
 * Primary app routes.
 */
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const accountRoutes = require('./routes/account');
const tokensRoutes = require('./routes/tokens');
const galleryRoutes = require('./routes/gallery');
const adminRoutes = require('./routes/admin');
const authController = require('./controllers/auth');
const userController = require('./controllers/user');
const accountController = require('./controllers/account');
const tokensConroller = require('./controllers/tokens');

app.use(indexRoutes);
app.use(authRoutes);
app.post('/signup', signupVaildation, isAlreadyAuth, authController.postSignup);
app.post(
  '/login',
  isAlreadyAuth,
  isAccounActivated,
  loginVaildation,
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login'
  }),
  authController.postLogin
);
app.get('/logout', authController.getLogout);
app.use('/user', userRoutes);
app.get('/user/activation/:token', userController.getActivation);
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
app.use('/account', isLoggedin, accountRoutes);
app.put('/account', isLoggedin, accountController.putAccount);
app.get(
  '/account/email-verify/:token',
  isLoggedin,
  isEMailVerificationTokenVaild,
  accountController.emailVeirfy
);
app.get(
  '/account/resend/email-verify',
  isLoggedin,
  accountController.resendEmailVeirfy
);

app.use('/tokens', isLoggedin, tokensRoutes);
app.post('/tokens', isLoggedin, tokensConroller.postToken);
app.put(
  '/tokens/:token_id',
  isLoggedin,
  accountRenameTokenVaildation,
  tokensConroller.putToken
);
app.delete('/tokens/:token_id', isLoggedin, tokensConroller.deleteToken);
app.use('/gallery', isLoggedin, galleryRoutes);
app.use('/admin', isLoggedin, isAdmin, adminRoutes);

/**
 * API routes.
 * This is the only one that will be split up in
 * the route files it self.  As it will be easyier to mange the versions
 */
// TODO add the API route for uploading under v1
const apiRoutes = require('./routes/api');

app.use('/api', limiter, apiRoutes);

/**
 * Handle 404 errors
 */
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  res.status(404);

  // respond with json
  if (req.accepts('json')) {
    res
      .status(404)
      .json({ error: 'Whoops, this resource or route could not be found' });
    return;
  }

  // default to plain-text. send()
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
      consola.info(`Base URL: http://localhost:${app.get('port')}`);
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
