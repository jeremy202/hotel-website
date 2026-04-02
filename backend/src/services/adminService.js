const { createObjectCsvStringifier } = require("csv-writer");
const { query } = require("../config/db");

async function getDashboardAnalytics() {
  const [revenueRes, bookingsRes, occupancyRes] = await Promise.all([
    query(
      `SELECT COALESCE(SUM(amount), 0) AS total_revenue
       FROM payments
       WHERE status = 'success'`,
    ),
    query(`SELECT COUNT(*)::int AS total_bookings FROM bookings`),
    query(
      `SELECT
        COUNT(*) FILTER (WHERE status = 'confirmed')::int AS confirmed_bookings,
        COUNT(*)::int AS all_bookings
       FROM bookings`,
    ),
  ]);

  const revenue = Number(revenueRes.rows[0].total_revenue || 0);
  const totalBookings = Number(bookingsRes.rows[0].total_bookings || 0);
  const { confirmed_bookings: confirmedBookings = 0, all_bookings: allBookings = 0 } =
    occupancyRes.rows[0] || {};
  const occupancyRate = allBookings ? (confirmedBookings / allBookings) * 100 : 0;

  return {
    revenue,
    totalBookings,
    occupancyRate: Number(occupancyRate.toFixed(2)),
  };
}

async function getAvailabilityCalendar({ startDate, endDate }) {
  const result = await query(
    `SELECT b.room_id, b.check_in, b.check_out, b.status, r.name AS room_name
     FROM bookings b
     INNER JOIN rooms r ON r.id = b.room_id
     WHERE b.check_out > $1::date
       AND b.check_in < $2::date
       AND b.status IN ('pending', 'confirmed')
     ORDER BY b.check_in ASC`,
    [startDate, endDate],
  );

  return result.rows;
}

async function exportBookingsToCSV() {
  const bookings = await query(
    `SELECT
      b.id,
      b.guest_name,
      b.guest_email,
      b.check_in,
      b.check_out,
      b.nights,
      b.total_amount,
      b.status,
      b.created_at,
      r.name AS room_name
     FROM bookings b
     INNER JOIN rooms r ON r.id = b.room_id
     ORDER BY b.created_at DESC`,
  );

  const csvStringifier = createObjectCsvStringifier({
    header: [
      { id: "id", title: "ID" },
      { id: "guest_name", title: "Guest Name" },
      { id: "guest_email", title: "Guest Email" },
      { id: "room_name", title: "Room" },
      { id: "check_in", title: "Check In" },
      { id: "check_out", title: "Check Out" },
      { id: "nights", title: "Nights" },
      { id: "total_amount", title: "Total Amount" },
      { id: "status", title: "Status" },
      { id: "created_at", title: "Created At" },
    ],
  });

  return `${csvStringifier.getHeaderString()}${csvStringifier.stringifyRecords(bookings.rows)}`;
}

module.exports = {
  getDashboardAnalytics,
  getAvailabilityCalendar,
  exportBookingsToCSV,
};
