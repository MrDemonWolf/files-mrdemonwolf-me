const devSMTP = require('../config/devSmtp');
const sendgrid = require('../config/sendgrid');

module.exports = async msg => {
  if (process.env.DEV_SMTP === 'true') {
    return devSMTP.sendMail(msg);
  }
  await sendgrid.send(msg);
};
