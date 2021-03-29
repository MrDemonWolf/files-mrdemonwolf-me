const User = require('../models/User');
const Session = require('../models/Session');

/**
 * Load Configs
 */
const testAccounts = require('./data/testAccounts.json');

describe('🧹 Clean up:', () => {
  it('Remove all accounts', async () => {
    const email = [
      testAccounts.user.email,
      testAccounts.admin.email,
      testAccounts.owner.email,
      testAccounts.extra.emailVerification.email,
      testAccounts.extra.passwordChange.email,
      testAccounts.extra.account.email,
      testAccounts.extra.account.ec,
      testAccounts.extra.twoFactor.email
    ];
    await User.deleteMany({ email });
  });

  it('Remove all sessions', async () => {
    await Session.deleteMany({});
  });
});
