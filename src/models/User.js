const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const slugify = require('slugify');

const { Schema } = mongoose;

const userSchema = new Schema(
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
    emailVerificationToken: String,
    emailVerificationTokenExpire: Date,
    emailVerified: {
      type: Boolean,
      default: false
    },
    newEmailVerificationToken: String,
    newEmailVerificationTokenExpire: Date,
    newEmail: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      trim: true,
      lowercase: true
    },
    mfaSecret: String,
    mfa: {
      type: Boolean,
      default: false
    },
    isBanned: {
      type: Boolean,
      default: false
    },
    isSuspended: {
      type: Boolean,
      default: false
    },
    suspendedExpire: Date,
    suspendedReason: String,
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
    isVerified: {
      type: Boolean,
      default: false
    },
    lastLogin: Date,
    lastLoginIP: String,
    lastLoginLocation: String,
    lastUpload: Date
  },
  {
    timestamps: true
  }
);

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
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
userSchema.pre('save', function save(next) {
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
userSchema.methods.verifyPassword = async function verifyPassword(
  candidatePassword
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  if (!isMatch) {
    return false;
  }
  return true;
};

userSchema.index(
  { username: 'text', email: 'text' },
  { weights: { username: 1, email: 2 } }
);

module.exports = mongoose.model('User', userSchema);
