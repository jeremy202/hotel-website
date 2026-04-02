const asyncHandler = require("../utils/asyncHandler");
const adminService = require("../services/adminService");
const bookingRepository = require("../repositories/bookingRepository");
const paymentRepository = require("../repositories/paymentRepository");
const bookingService = require("../services/bookingService");

const getDashboardAnalytics = asyncHandler(async (_req, res) => {
  const data = await adminService.getDashboardAnalytics();
  res.json({ data });
});

const getAllBookings = asyncHandler(async (req, res) => {
  const data = await bookingRepository.list(req.query);
  res.json({ data });
});

const getAllTransactions = asyncHandler(async (req, res) => {
  const data = await paymentRepository.listPayments(req.query);
  res.json({ data });
});

const getAvailabilityCalendar = asyncHandler(async (req, res) => {
  const data = await adminService.getAvailabilityCalendar(req.query);
  res.json({ data });
});

const createManualBooking = asyncHandler(async (req, res) => {
  const data = await bookingService.createPendingBooking({
    roomId: req.body.roomId,
    userId: req.body.userId || null,
    guestName: req.body.guestName,
    guestEmail: req.body.guestEmail,
    guestPhone: req.body.guestPhone,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
    guests: req.body.guests || 1,
    specialRequests: req.body.specialRequests,
    couponCode: req.body.couponCode,
  });
  res.status(201).json({ message: "Manual booking created", data });
});

const exportBookingsCsv = asyncHandler(async (_req, res) => {
  const csv = await adminService.exportBookingsCsv();
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="bookings.csv"');
  res.status(200).send(csv);
});

module.exports = {
  getDashboardAnalytics,
  getAllBookings,
  getAllTransactions,
  getAvailabilityCalendar,
  createManualBooking,
  exportBookingsCsv,
};
