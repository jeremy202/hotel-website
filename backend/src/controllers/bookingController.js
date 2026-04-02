const asyncHandler = require("../utils/asyncHandler");
const bookingService = require("../services/bookingService");

const createBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.createPendingBooking({
    userId: req.user?.id || null,
    roomId: req.body.roomId,
    guestName: req.body.guestName,
    guestEmail: req.body.guestEmail,
    guestPhone: req.body.guestPhone,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
    specialRequests: req.body.specialRequests,
    couponCode: req.body.couponCode,
    guests: req.body.guests || 1,
  });

  return res.status(201).json({
    message: "Booking created and awaiting payment",
    data: booking,
  });
});

const getBookingById = asyncHandler(async (req, res) => {
  const booking = await bookingService.getBookingById(Number(req.params.bookingId));
  res.status(200).json({ data: booking });
});

const listBookings = asyncHandler(async (req, res) => {
  const bookings = await bookingService.listBookings(req.query);
  res.status(200).json({ data: bookings });
});

const updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await bookingService.updateBookingStatus(
    Number(req.params.bookingId),
    req.body.status,
  );
  res.status(200).json({ message: "Booking status updated", data: booking });
});

module.exports = {
  createBooking,
  getBookingById,
  listBookings,
  updateBookingStatus,
};
