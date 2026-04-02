const nodemailer = require("nodemailer");
const env = require("../config/env");
const logger = require("../config/logger");

const transporter = nodemailer.createTransport({
  host: env.smtpHost,
  port: env.smtpPort,
  secure: env.smtpPort === 465,
  auth: {
    user: env.smtpUser,
    pass: env.smtpPass,
  },
});

function bookingConfirmationTemplate(booking) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2 style="margin-bottom: 0.25rem;">Grand Comodores Booking Confirmation</h2>
      <p style="margin-top: 0;">Dear ${booking.guest_name}, your reservation is confirmed.</p>
      <ul>
        <li><strong>Booking Ref:</strong> ${booking.booking_reference}</li>
        <li><strong>Room:</strong> ${booking.room_name}</li>
        <li><strong>Check-in:</strong> ${booking.check_in}</li>
        <li><strong>Check-out:</strong> ${booking.check_out}</li>
        <li><strong>Total:</strong> NGN ${Number(booking.total_amount).toLocaleString()}</li>
        <li><strong>Status:</strong> ${booking.status}</li>
      </ul>
      <p>We look forward to welcoming you to Grand Comodores.</p>
    </div>
  `;
}

function adminNotificationTemplate(booking, paymentReference) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>New Booking/Payment Notification</h2>
      <p>A guest booking was completed successfully.</p>
      <ul>
        <li><strong>Guest:</strong> ${booking.guest_name} (${booking.guest_email})</li>
        <li><strong>Room:</strong> ${booking.room_name}</li>
        <li><strong>Dates:</strong> ${booking.check_in} to ${booking.check_out}</li>
        <li><strong>Amount:</strong> NGN ${Number(booking.total_amount).toLocaleString()}</li>
        <li><strong>Paystack Reference:</strong> ${paymentReference}</li>
      </ul>
    </div>
  `;
}

async function sendMail({ to, subject, html }) {
  if (!env.smtpUser || !env.smtpPass) {
    logger.info("SMTP credentials missing; skipping email send.");
    return;
  }

  await transporter.sendMail({
    from: `"Grand Comodores" <${env.smtpUser}>`,
    to,
    subject,
    html,
  });
}

async function sendBookingConfirmationEmail(booking) {
  await sendMail({
    to: booking.guest_email,
    subject: "Your Grand Comodores booking is confirmed",
    html: bookingConfirmationTemplate(booking),
  });
}

async function sendAdminNotificationEmail(booking, paymentReference) {
  await sendMail({
    to: env.adminEmail,
    subject: `New booking: ${booking.guest_name} - ${booking.room_name}`,
    html: adminNotificationTemplate(booking, paymentReference),
  });
}

module.exports = {
  sendBookingConfirmationEmail,
  sendAdminNotificationEmail,
};
