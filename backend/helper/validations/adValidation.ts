const { check } = require("express-validator");
const { validationErrorHandler } = require("../global");

export const requestGetValidate = [validationErrorHandler];
export const adValidate = [
    check("title")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Ad Ttitle is Required."),
    check("client").notEmpty().withMessage("Client is required."),
    check("count").notEmpty().withMessage("Count is required."),
    check("country").notEmpty().withMessage("Country is required."),
    check("state").notEmpty().withMessage("State is required."),
    check("city").notEmpty().withMessage("City is required."),
    check("tags")
      .notEmpty()
      .withMessage("Tags are required.")
      .isLength({ min: 10, max: 500 })
      .withMessage("Minimum Tags should be 2 or 3"),
  
    validationErrorHandler,
  ];
  