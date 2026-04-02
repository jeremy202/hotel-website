const { body, param, query } = require("express-validator");

const createRoomValidator = [
  body("slug")
    .trim()
    .matches(/^[a-z0-9-]+$/)
    .withMessage("Slug must contain only lowercase letters, numbers and hyphens"),
  body("name").trim().notEmpty().withMessage("Room name is required"),
  body("roomType").trim().notEmpty().withMessage("roomType is required"),
  body("description").trim().notEmpty().withMessage("description is required"),
  body("pricePerNight")
    .isFloat({ min: 0 })
    .withMessage("pricePerNight must be a positive number"),
  body("maxGuests").isInt({ min: 1 }).withMessage("maxGuests must be at least 1"),
  body("amenities").optional().isArray().withMessage("amenities must be an array"),
  body("isAvailable").optional().isBoolean().withMessage("isAvailable must be a boolean"),
  body("images").optional().isArray().withMessage("images must be an array of URLs"),
];

const updateRoomValidator = [
  param("id").isInt({ min: 1 }).withMessage("Invalid room ID"),
  body("slug")
    .optional()
    .trim()
    .matches(/^[a-z0-9-]+$/)
    .withMessage("Slug must contain only lowercase letters, numbers and hyphens"),
  body("name").optional().trim().notEmpty().withMessage("Room name is required"),
  body("roomType").optional().trim().notEmpty().withMessage("roomType is required"),
  body("description").optional().trim().notEmpty().withMessage("description is required"),
  body("pricePerNight")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("pricePerNight must be a positive number"),
  body("maxGuests").optional().isInt({ min: 1 }).withMessage("maxGuests must be at least 1"),
  body("amenities").optional().isArray().withMessage("amenities must be an array"),
  body("isAvailable").optional().isBoolean().withMessage("isAvailable must be a boolean"),
  body("images").optional().isArray().withMessage("images must be an array of URLs"),
];

const roomAvailabilityValidator = [
  param("id").isInt({ min: 1 }).withMessage("Invalid room ID"),
  query("checkInDate").isISO8601().withMessage("checkInDate must be a valid date"),
  query("checkOutDate").isISO8601().withMessage("checkOutDate must be a valid date"),
];

module.exports = {
  createRoomValidator,
  updateRoomValidator,
  roomFilterValidator: [],
  roomIdValidator: [param("id").isInt({ min: 1 }).withMessage("Invalid room ID")],
  roomAvailabilityValidator,
};
