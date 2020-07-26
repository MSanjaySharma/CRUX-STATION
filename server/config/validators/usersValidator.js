const { check } = require("express-validator");
const usersValidator = {};

usersValidator.register = [
  //name
  check("name").not().isEmpty().withMessage("Name is required"),
  check("name")
    .isLength({ max: 32 })
    .withMessage("Name can't be above 64 characters"),

  //email
  check("email").isEmail().withMessage("Enter a valid email address"),

  //password
  check("password").not().isEmpty().withMessage("Password is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  check("password")
    .isLength({ max: 13 })
    .withMessage("Password must be maximum 13 characters long"),
];

usersValidator.login = [
  //email
  check("email").isEmail().withMessage("Enter a valid email address"),

  //password
  check("password").not().isEmpty().withMessage("Password is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  /*   check("password")
    .isLength({ max: 13 })
    .withMessage("Password must be maximum 13 characters long"), */
];

module.exports = usersValidator;
