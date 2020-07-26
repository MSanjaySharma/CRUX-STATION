const { check } = require("express-validator");
const categoriesValidator = {};

categoriesValidator.categoryCreate = [
  //name
  check("name").not().isEmpty().withMessage("Category Name is required"),
  check("name")
    .isLength({ max: 32 })
    .withMessage(" Category Name should be within 32 characters"),
];

module.exports = categoriesValidator;

