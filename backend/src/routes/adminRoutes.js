const express = require("express");
const adminController = require("../controllers/adminController");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth.authenticate, auth.authorize("admin"));

router.get("/analytics", adminController.getDashboardAnalytics);
router.get("/bookings", adminController.getAllBookings);
router.get("/transactions", adminController.getAllTransactions);
router.get("/calendar", adminController.getAvailabilityCalendar);
router.post("/bookings/manual", adminController.createManualBooking);
router.get("/bookings/export", adminController.exportBookingsCsv);

module.exports = router;
