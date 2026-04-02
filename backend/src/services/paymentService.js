const ApiError = require("../utils/apiError");
const bookingRepo = require("../repositories/bookingRepository");
const paymentRepo = require("../repositories/paymentRepository");
const paystackService = require("./paystackService");
const emailService = require("./emailService");

async function initializePayment({ bookingId, email, callbackUrl }) {
  const booking = await bookingRepo.findById(bookingId);
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  const reference = paystackService.buildReference(booking.id);

  const existingPayment = await paymentRepo.findByReference(reference);
  if (!existingPayment) {
    await paymentRepo.createPending({
      bookingId: booking.id,
      userId: booking.user_id,
      amount: booking.total_amount,
      reference,
    });
  }

  const gateway = await paystackService.initializeTransaction({
    email,
    amountKobo: Number(booking.total_amount) * 100,
    reference,
    metadata: {
      bookingId: booking.id,
      roomId: booking.room_id,
      bookingReference: booking.booking_reference,
    },
    callbackUrl,
  });

  return {
    bookingId: booking.id,
    reference,
    authorizationUrl: gateway.authorization_url,
    accessCode: gateway.access_code,
  };
}

async function verifyPayment(reference) {
  const data = await paystackService.verifyTransaction(reference);
  const payment = await paymentRepo.findByReference(data.reference);
  if (!payment) {
    throw new ApiError(404, "Payment record not found");
  }

  const status = data.status === "success" ? "success" : "failed";
  const paidAt = status === "success" ? new Date(data.paid_at || new Date()) : null;

  await paymentRepo.markStatus({
    reference: data.reference,
    status,
    paidAt,
    transactionId: data.id ? String(data.id) : null,
  });

  const bookingStatus = status === "success" ? "confirmed" : "cancelled";
  await bookingRepo.updateStatus(payment.booking_id, bookingStatus);
  const booking = await bookingRepo.findById(payment.booking_id);

  if (status === "success") {
    await emailService.sendBookingConfirmationEmail(booking);
    await emailService.sendAdminNotificationEmail(booking, data.reference);
  }

  return {
    bookingId: payment.booking_id,
    reference: data.reference,
    status,
  };
}

module.exports = {
  initializePayment,
  verifyPayment,
};
