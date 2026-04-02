const { body, param } = require("express-validator");

const initializePaymentValidator = [
  body("bookingId").isInt({ min: 1 }).withMessage("bookingId must be a positive integer"),
  body("email").optional().isEmail().withMessage("email must be valid"),
];

const verifyPaymentValidator = [
  body("reference").trim().notEmpty().withMessage("Payment reference is required"),
];

module.exports = { initializePaymentValidator, verifyPaymentValidator };
