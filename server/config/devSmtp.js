const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  port: process.env.DEV_SMTP_PORT || 587,
  ip: process.env.DEV_SMTP_IP || 'localhost',

  secure: false,
  tls: {
    rejectUnauthorized: false
  }
});
