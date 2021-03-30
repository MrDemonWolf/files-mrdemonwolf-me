const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const slugify = require('slugify');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true
    },
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      unique: true,
      trim: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    twoFactor: {
      type: Boolean,
      default: false
    },
    twoFactorSecret: String,
    twoFactorBackupCodes: Array,
    emailVerificationToken: String,
    emailVerificationTokenExpire: Date,
    emailVerified: {
      type: Boolean,
      default: false
    },
    newEmail: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      trim: true,
      lowercase: true
    },
    emailChanged: Date,
    isBanned: {
      type: Boolean,
      default: false
    },
    passwordChanged: Date,
    passwordResetToken: String,
    passwordResetTokenExpire: Date,
    streamerMode: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ['owner', 'admin', 'user'],
      default: 'user'
    },

    lastLogin: Date,
    lastLoginIP: String
  },
  {
    timestamps: true
  }
);

/**
 * Password hash middleware.
 */
UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(12, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

/**
 * Username to slug.
 */
UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('username')) {
    return next();
  }
  user.slug = slugify(user.username, {
    remove: /[*+~.()'"!:@]/g,
    lower: true
  });
  next();
});

/**
 * Helper method for validating user's password.
 */
UserSchema.methods.verifyPassword = async function verifyPassword(
  candidatePassword
) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    if (!isMatch) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

UserSchema.index(
  { username: 'text', email: 'text' },
  { weights: { username: 1, email: 2 } }
);

module.exports = mongoose.model('User', UserSchema);
