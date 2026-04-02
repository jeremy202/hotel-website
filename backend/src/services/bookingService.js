const dayjs = require("dayjs");
const ApiError = require("../utils/apiError");
const bookingRepository = require("../repositories/bookingRepository");
const roomRepository = require("../repositories/roomRepository");

const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
};

function calculateNights(checkInDate, checkOutDate) {
  const start = dayjs(checkInDate);
  const end = dayjs(checkOutDate);
  return end.diff(start, "day");
}

async function validateBookingWindow(roomId, checkInDate, checkOutDate) {
  const room = await roomRepository.findById(roomId);
  if (!room || !room.is_available) {
    throw new ApiError(404, "Selected room is not available");
  }

  const nights = calculateNights(checkInDate, checkOutDate);
  if (nights <= 0) {
    throw new ApiError(400, "Check-out must be later than check-in");
  }

  const overlapExists = await bookingRepository.hasOverlap({
    roomId,
    checkInDate,
    checkOutDate,
  });

  if (overlapExists) {
    throw new ApiError(
      409,
      "Room already booked for the selected dates. Please choose another date range.",
    );
  }

  return {
    room,
    nights,
    totalAmount: Number(room.price_per_night) * nights,
  };
}

async function createPendingBooking({
  roomId,
  userId,
  guestName,
  guestEmail,
  guestPhone,
  checkInDate,
  checkOutDate,
  guests = 1,
  specialRequests,
  couponCode,
}) {
  const pricing = await validateBookingWindow(roomId, checkInDate, checkOutDate);
  const booking = await bookingRepository.create({
    userId,
    roomId,
    guestName,
    guestEmail,
    guestPhone,
    checkInDate,
    checkOutDate,
    guests,
    nights: pricing.nights,
    totalAmount: pricing.totalAmount,
    status: BOOKING_STATUS.PENDING,
    couponCode,
    specialRequests,
  });

  return { booking, pricing };
}

async function getBookingById(id) {
  const booking = await bookingRepository.findById(id);
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }
  return booking;
}

async function listBookings(filters = {}) {
  return bookingRepository.list(filters);
}

async function updateBookingStatus(id, status) {
  const booking = await bookingRepository.updateStatus(id, status);
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }
  return booking;
}

async function listMyBookings(userId) {
  return bookingRepository.list({ userId });
}

async function isRoomAvailable(roomId, checkInDate, checkOutDate) {
  const overlap = await bookingRepository.hasOverlap({ roomId, checkInDate, checkOutDate });
  return !overlap;
}

async function getUnavailableDates(roomId) {
  return bookingRepository.getUnavailableRanges(roomId);
}

module.exports = {
  BOOKING_STATUS,
  calculateNights,
  validateBookingWindow,
  createPendingBooking,
  getBookingById,
  listBookings,
  updateBookingStatus,
  listMyBookings,
  isRoomAvailable,
  getUnavailableDates,
};
