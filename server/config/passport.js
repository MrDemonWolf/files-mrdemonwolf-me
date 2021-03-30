const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

/**
 * Load MongoDB models.
 */
const User = require('../models/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.sub).select(
          '-password'
        );
        if (user) {
          return done(null, user);
        }
        done(null, false);
      } catch (err) {
        console.log(err);
      }
    })
  );
};
