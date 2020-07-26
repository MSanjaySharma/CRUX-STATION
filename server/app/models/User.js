const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const isEmail = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 32,
      unique: true,
      index: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return isEmail(value);
        },
        message: function () {
          return "invalid email format";
        },
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 128,
    },
    profile: {
      type: String,
      required: true,
    },
    loginCount: {
      type: Number,
      default: 0,
    },
    about: {
      type: String,
    },
    role: {
      type: Number,
      trim: true,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    likedPosts: [{ type: ObjectId, ref: "Blog" }],
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
