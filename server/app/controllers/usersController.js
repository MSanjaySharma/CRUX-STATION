const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const shortId = require("shortid");
const expressJwt = require("express-jwt");
const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");

const User = require("../models/User");
const Blog = require("../models/Blog");
const { errorHandler } = require("../../utils/dbErrorHandler");
const { response } = require("express");

const usersController = {};

usersController.register = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.json({
        error: "Email is taken",
      });
    } else {
      const body = req.body;
      let username = `${shortId.generate()}|${req.body.name
        .split(" ")
        .join("-")}`;
      let profile = `${process.env.CLIENT_URL}/profile/${username}`;
      body.username = username;
      body.profile = profile;

      const user = new User(body);
      bcryptjs.genSalt().then((salt) => {
        bcryptjs.hash(user.password, salt).then((encrypted) => {
          user.password = encrypted;
          user
            .save()
            .then(() => {
              //res.json(user);
              res.json({ message: "Signup success! Please Signin" });
            })
            .catch((err) => {
              res.json(err);
            });
        });
      });
    }
  });
};

usersController.login = (req, res) => {
  const body = req.body;
  User.findOne({ email: body.email }).then((user) => {
    if (!user) {
      res.json({
        error: "invalid email or password",
      });
      return;
    } else if (user.loginCount >= 3) {
      res.json({ error: "Maximum 3 login at a time permitted" });
    } else {
      bcryptjs.compare(body.password, user.password).then((match) => {
        if (match) {
          const tokenData = {
            _id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
          };
          const token = jwt.sign(tokenData, process.env.JWT_SIGN_KEY, {
            expiresIn: "30d",
          });
          res.cookie("token", token, { expiresIn: "30d" });
          User.findByIdAndUpdate(
            user._id,
            { $inc: { loginCount: 1 } },
            { new: true }
          ).then((user) => {
            res.json({
              token: `Bearer ${token}`,
            });
          });
        } else {
          res.json({ error: "invalid email or password" });
        }
      });
    }
  });
};

usersController.logout = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id, loginCount: { $gt: 0 } },
    { $inc: { loginCount: -1 } },
    { new: true }
  )
    .then((user) => {
      res.clearCookie("token");
      res.json({ message: "Logout success!" });
    })
    .catch((err) => {
      res.json({ error: "Logout success!" });
    });
};

usersController.account = (req, res) => {
  let user = req.user;
  user.photo = undefined;
  user.password = undefined;
  user.loginCount = undefined;
  res.json(user);
  //res.json(req.user);
};

usersController.publicProfile = (req, res) => {
  let username = req.params.username;
  let user;
  User.findOne({ username })
    .exec()
    .then((userDB) => {
      if (!userDB) {
        res.status(400).json({ error: "User not found" });
      } else {
        user = userDB;
        Blog.find({ postedBy: user._id })
          .populate("categories", "_id name slug")
          .populate("tags", "_id name slug")
          .populate("postedBy", "_id name")
          .limit(10)
          .select(
            "_id title slug excerpt categories tags postedBy createdAt updatedAt"
          )
          .exec()
          .then((blogs) => {
            user.photo = undefined;
            user.password = undefined;
            user.loginCount = undefined;
            user.role = undefined;

            res.json({ user, blogs });
          })
          .catch((err) => {
            res.status(400).json({ error: errorHandler(err) });
          });
      }
    })
    .catch((err) => res.status(400).json({ error: "User not found" }));
};

usersController.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return response
        .status(400)
        .json({ error: "Photo could not be uploaded" });
    }
    let user = req.user;
    user = _.extend(user, fields);

    if (fields.password && fields.password.length < 8) {
      return res.status(400).json({
        error: "Password should be minimum 8 characters long",
      });
    }

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1MB in size",
        });
      }

      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }

    bcryptjs.genSalt().then((salt) => {
      bcryptjs.hash(fields.password, salt).then((encrypted) => {
        user.password = encrypted;
        user
          .save()
          .then((user) => {
            user.password = undefined;
            user.photo = undefined;
            user.loginCount = undefined;
            return res.json(user);
          })
          .catch((err) => {
            res.status(400).json({ error: errorHandler(err) });
          });
      });
    });
  });
};

usersController.photo = (req, res) => {
  const username = req.params.username;
  console.log(username);
  User.findOne({ username })
    .exec()
    .then((user) => {
      if (!user) {
        res.status(400).json({ error: "User not found" });
      } else if (user.photo.data) {
        res.set("Content-Type", user.photo.contentType);
        return res.send(user.photo.data);
      } else {
        return res.status(400).json({ error: "User has no photo" });
      }
    })
    .catch((err) => res.status(400).json({ error: "User not found" }));
};

usersController.requireSignin = expressJwt({
  secret: process.env.JWT_SIGN_KEY,
});

module.exports = usersController;
