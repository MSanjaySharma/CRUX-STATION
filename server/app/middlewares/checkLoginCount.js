const checkLoginCount = (req, res, next) => {
  if (req.user.loginCount >= 3) {
    res.json({ error: "Maximum 3 login at a time permitted" });
  } else {
    next();
  }
};

module.exports = { checkLoginCount };
