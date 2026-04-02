const express = require("express");
const adminController = require("../controllers/adminController");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth.authenticate, auth.authorize("admin"));

router.get("/analytics", adminController.getAnalytics);
router.get("/bookings", adminController.listBookings);
router.get("/transactions", adminController.listTransactions);
router.get("/calendar", adminController.getCalendar);
router.post("/bookings/manual", adminController.createManualBooking);
router.get("/bookings/export", adminController.exportBookingsCsv);

module.exports = router;
