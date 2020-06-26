const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

/**
 * Load MongoDB models.
 */
const User = require('../models/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
// opts.audience = process.env.FULL_DOMAIN;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done, req) => {
      try {
        const user = await User.findById(jwtPayload.id).select(
          '-password -__v'
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
