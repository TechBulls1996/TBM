const { check } = require("express-validator");
const { validationErrorHandler } = require("../global");

export const loginValidate = [
  // username must be an email
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email address!"),
  // password must be at least 5 chars long
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password should be strong and valid."),

  validationErrorHandler,
];

export const emailValidate = [
  // username must be an email
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email address!"),

  validationErrorHandler,
];

export const clientRegisterValidate = [
  check('fullname')
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Full Name is Required."),
  check('phone')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Phone number is Required."),
  check('address')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Address is Required.'),     
  check('email')
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email address!"),
   
  validationErrorHandler,
];

export const registerValidate =  [
  // username must be an email
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email address!"),
  // password must be at least 5 chars long
    check("password")
    .custom((value: any, { req }:any) => {
      // Check if ID is not present in the request
      if (!req.body.id && !value && value.length < 6) {
        throw new Error("Password should be strong and valid.");
      }
      return true;
    }),
    
  // check("confirmPass").custom((value: any, { req }: any) => {
  //   if (value !== req.body.password) {
  //     throw new Error("Password confirmation does not match password");
  //   }
  //   // Indicates the success of this synchronous custom validator
  //   return true;
  // }),
  check("fullName")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Full Name is Required."),

  check("phone")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Valid Phone Number is Required.")
    .isLength({ min: 10 }),

  check("gender").notEmpty().withMessage("Gender is required."),
  check("country").notEmpty().withMessage("Country is required."),
  check("state").notEmpty().withMessage("State is required."),
  check("city").notEmpty().withMessage("City is required."),
  check("address").notEmpty().withMessage("Address is required."),
  check("pinCode").notEmpty().withMessage("PinCode is required."),

  validationErrorHandler,
];
