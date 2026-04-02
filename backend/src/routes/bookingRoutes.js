const express = require("express");
const bookingController = require("../controllers/bookingController");
const {
  createBookingValidator,
  updateBookingStatusValidator,
  bookingsQueryValidator,
} = require("../validators/bookingValidators");
const validateRequest = require("../middleware/validateRequest");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", createBookingValidator, validateRequest, bookingController.createBooking);
router.get(
  "/",
  bookingsQueryValidator,
  validateRequest,
  auth(["admin"]),
  bookingController.listBookings
);
router.get("/:bookingId", auth(), bookingController.getBookingById);

router.patch(
  "/:bookingId/status",
  auth(["admin"]),
  updateBookingStatusValidator,
  validateRequest,
  bookingController.updateBookingStatus,
);

module.exports = router;
