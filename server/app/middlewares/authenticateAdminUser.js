const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authenticateAdminUser = (req, res, next) => {
  const token = req.header("Authorization")
    ? req.header("Authorization").split(" ")[1]
    : false;
  if (token) {
    let tokenData;
    try {
      tokenData = jwt.verify(token, process.env.JWT_SIGN_KEY);
      console.log("admin::tokenData--", tokenData);
      console.log("body", req.body);
      User.findOne({ _id: tokenData._id, role: 1 })
        .exec()
        .then((user) => {
          console.log("admin::user from db--", user);
          if (user === null) {
            return res
              .status(400)
              .json({ jwtError: "admin resource Access denied" });
          }
          req.user = user;
          next();
        })
        .catch((err) => {
          res.status(401).json({ jwtError: err });
        });
    } catch (e) {
      res.status(401).json({jwtError: e.message});
    }
  } else {
    res.status(401).json({ jwtError: "token not provided" });
  }
};

module.exports = {
  authenticateAdminUser,
};
