const { check } = require("express-validator");
const tagsValidator = {};

tagsValidator.tagCreate = [
  //name
  check("name").not().isEmpty().withMessage("Tags Name is required"),
  check("name")
    .isLength({ max: 32 })
    .withMessage(" Tags Name should be within 32 characters"),
];

module.exports = tagsValidator;
