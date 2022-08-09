const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// static sign up method
userSchema.statics.signUp = async function (email, password) {
  // validation
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  if (!validator.isEmail(email)) {
    throw new Error('Email is invalid');
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error('Password is not strong enough');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error('Email already exists');
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    email: email,
    password: hashedPassword,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error('Incorrect email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Password is incorrect');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
