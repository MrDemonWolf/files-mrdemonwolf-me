const express = require('express');
const logger = require('morgan');
const consola = require('consola');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const lusca = require('lusca');
const mongoose = require('mongoose');
const passport = require('passport');

/**
 * Load environment variables from the .env file, where API keys and passwords are stored.
 */
require('dotenv').config();

/**
 * Create Express server.
 *
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
 * Express configuration (compression, logging, body-parser,methodoverride)
 */
app.set('host', process.env.IP || '127.0.0.1');
app.set('port', process.env.PORT || 5050);
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
lusca.referrerPolicy('same-origin');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('etag', false);

const corsOptions = {
  origin: process.env.FULL_DOMAIN
};

switch (process.env.NODE_ENV) {
  case 'production ':
    app.use(logger('combined'));
    app.use(cors(corsOptions));
    app.enable('trust proxy');
    app.set('trust proxy', 1);
    app.use(compression());
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
 * Passport middleware configuration.
 */
app.use(passport.initialize());
require('./config/passport')(passport);

/**
 * Primary app routes.
 */
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

/**
 * Handle 404 errors
 */
app.use((req, res, next) => {
  res.status(404);
  res.status(404).json({
    code: 404,
    error: 'Whoops, this resource or route could not be found'
  });
});

/**
 * Express actions
 */
db.on('error', () => {
  consola.error(
    new Error('MongoDB connection error. Please make sure MongoDB is running.`')
  );
});

db.once('open', () => {
  app.listen(app.get('port'), () => {
    // Log infomation after everything is started.
    consola.log('----------------------------------------');
    consola.info(`Environment: ${app.get('env')}`);
    consola.info(`App URL: http://localhost:${app.get('port')}`);
    consola.log('----------------------------------------');
  });
});

// Cloes connection to mongodb on exit.
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    consola.success(
      'Mongoose connection is disconnected due to application termination'
    );
    process.exit(0);
  });
});
