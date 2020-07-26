const jwt = require("jsonwebtoken");
const User = require("../models/User");
const isAdmin = (req, res, next) => {
  const token = req.header("Authorization")
    ? req.header("Authorization").split(" ")[1]
    : false;
  if (token) {
    let tokenData;
    try {
      tokenData = jwt.verify(token, process.env.JWT_SIGN_KEY);
      console.log("isAdmin::tokenData--", tokenData);
      User.findOne({ _id: tokenData._id, role: 1 })
        .exec()
        .then((user) => {
          console.log("isAdmin:user from db--", user);
          if (user === null) {
            return res.json({ isAdmin: false });
          }
          res.json({ isAdmin: true });
        })
        .catch((err) => {
          res.json({ error: err });
        });
    } catch (e) {
      res.json(e.message);
    }
  } else {
    res.json({ error: "token not provided" });
  }
};

module.exports = { isAdmin };
