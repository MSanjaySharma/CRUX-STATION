const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")
    ? req.header("Authorization").split(" ")[1]
    : false;
  if (token) {
    let tokenData;
    try {
      tokenData = jwt.verify(token, process.env.JWT_SIGN_KEY);
      console.log("auth::tokenData--", tokenData);
      User.findById(tokenData._id)
        .then((user) => {
          req.user = user;
          console.log("auth::user from db--", user);
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
  authenticateUser,
};
