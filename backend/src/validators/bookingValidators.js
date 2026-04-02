const { body, param, query } = require("express-validator");

const createBookingRules = [
  body("roomId").isInt({ min: 1 }).withMessage("roomId must be a positive integer"),
  body("guestName").trim().notEmpty().withMessage("guestName is required"),
  body("guestEmail").isEmail().withMessage("A valid guestEmail is required"),
  body("guestPhone").trim().notEmpty().withMessage("guestPhone is required"),
  body("checkIn").isISO8601().withMessage("checkIn must be a valid date"),
  body("checkOut").isISO8601().withMessage("checkOut must be a valid date"),
  body("guests").optional().isInt({ min: 1, max: 10 }).withMessage("guests must be 1-10"),
  body("specialRequests").optional().isString(),
  body("couponCode").optional().trim().isLength({ min: 3, max: 32 }),
];

const updateBookingStatusRules = [
  param("bookingId").isInt({ min: 1 }).withMessage("bookingId must be a positive integer"),
  body("status")
    .isIn(["pending", "confirmed", "cancelled"])
    .withMessage("status must be pending, confirmed, or cancelled"),
];

const bookingsQueryRules = [
  query("status")
    .optional()
    .isIn(["pending", "confirmed", "cancelled"])
    .withMessage("Invalid status filter"),
  query("startDate").optional().isISO8601().withMessage("startDate must be a valid date"),
  query("endDate").optional().isISO8601().withMessage("endDate must be a valid date"),
];

module.exports = {
  createBookingRules,
  updateBookingStatusRules,
  bookingsQueryRules,
  createBookingValidator: createBookingRules,
  updateBookingStatusValidator: updateBookingStatusRules,
  bookingsQueryValidator: bookingsQueryRules,
};
