const { query } = require("../config/db");
const { TABLES } = require("../models/tables");

async function create(payload) {
  const sql = `
    INSERT INTO ${TABLES.bookings} (
      booking_reference,
      user_id,
      room_id,
      guest_name,
      guest_email,
      guest_phone,
      check_in,
      check_out,
      nights,
      guests,
      base_amount,
      tax_amount,
      total_amount,
      status,
      coupon_code,
      discount_amount
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
    RETURNING *;
  `;
  const values = [
    payload.bookingReference,
    payload.userId ?? null,
    payload.roomId,
    payload.guestName,
    payload.guestEmail,
    payload.guestPhone ?? null,
    payload.checkInDate,
    payload.checkOutDate,
    payload.nights,
    payload.guests ?? 1,
    payload.baseAmount ?? payload.totalAmount,
    payload.taxAmount ?? 0,
    payload.totalAmount,
    payload.status ?? "pending",
    payload.couponCode ?? null,
    payload.discountAmount ?? 0,
  ];
  const result = await query(sql, values);
  return result.rows[0];
}

async function updateStatus(bookingId, status) {
  const result = await query(
    `UPDATE ${TABLES.bookings}
     SET status = $2, updated_at = NOW()
     WHERE id = $1
     RETURNING *;`,
    [bookingId, status],
  );
  return result.rows[0] || null;
}

async function findById(bookingId) {
  const result = await query(
    `SELECT b.*, r.name AS room_name, r.room_type
     FROM ${TABLES.bookings} b
     JOIN ${TABLES.rooms} r ON r.id = b.room_id
     WHERE b.id = $1
     LIMIT 1;`,
    [bookingId],
  );
  return result.rows[0] || null;
}

async function findByReference(reference) {
  const result = await query(
    `SELECT b.*
     FROM ${TABLES.bookings} b
     JOIN ${TABLES.payments} p ON p.booking_id = b.id
     WHERE p.paystack_reference = $1
     LIMIT 1;`,
    [reference],
  );
  return result.rows[0] || null;
}

async function list(filters = {}) {
  const conditions = [];
  const values = [];

  if (filters.status) {
    values.push(filters.status);
    conditions.push(`b.status = $${values.length}`);
  }
  if (filters.startDate) {
    values.push(filters.startDate);
    conditions.push(`b.check_in >= $${values.length}`);
  }
  if (filters.endDate) {
    values.push(filters.endDate);
    conditions.push(`b.check_out <= $${values.length}`);
  }
  if (filters.userId) {
    values.push(filters.userId);
    conditions.push(`b.user_id = $${values.length}`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const sql = `
    SELECT b.*, r.name AS room_name, r.room_type
    FROM ${TABLES.bookings} b
    JOIN ${TABLES.rooms} r ON r.id = b.room_id
    ${whereClause}
    ORDER BY b.created_at DESC;
  `;
  const result = await query(sql, values);
  return result.rows;
}

async function hasOverlap({ roomId, checkInDate, checkOutDate }) {
  const sql = `
    SELECT 1
    FROM ${TABLES.bookings}
    WHERE room_id = $1
      AND status IN ('pending', 'confirmed')
      AND (check_in, check_out) OVERLAPS ($2::date, $3::date)
    LIMIT 1;
  `;
  const result = await query(sql, [roomId, checkInDate, checkOutDate]);
  return result.rowCount > 0;
}

async function listByUserId(userId) {
  const result = await query(
    `SELECT b.*, r.name AS room_name, r.room_type
     FROM ${TABLES.bookings} b
     JOIN ${TABLES.rooms} r ON r.id = b.room_id
     WHERE b.user_id = $1
     ORDER BY b.created_at DESC`,
    [userId],
  );
  return result.rows;
}

async function getUnavailableRanges(roomId) {
  const result = await query(
    `SELECT check_in, check_out
     FROM ${TABLES.bookings}
     WHERE room_id = $1
       AND status IN ('pending', 'confirmed')
     ORDER BY check_in ASC`,
    [roomId],
  );
  return result.rows;
}

async function isRangeAvailable(roomId, checkInDate, checkOutDate) {
  const hasBookedOverlap = await hasOverlap({ roomId, checkInDate, checkOutDate });
  return !hasBookedOverlap;
}

async function getRevenueSummary() {
  const result = await query(
    `SELECT
      COUNT(*) FILTER (WHERE status = 'confirmed')::int AS confirmed_bookings,
      COUNT(*) FILTER (WHERE status = 'pending')::int AS pending_bookings,
      COALESCE(SUM(total_amount) FILTER (WHERE status = 'confirmed'), 0)::numeric(12,2) AS total_revenue
     FROM ${TABLES.bookings};`,
  );
  return result.rows[0];
}

module.exports = {
  create,
  updateStatus,
  findById,
  findByReference,
  list,
  hasOverlap,
  isRangeAvailable,
  listByUserId,
  getUnavailableRanges,
  getRevenueSummary,
};
