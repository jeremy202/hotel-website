const { query } = require("../config/db");
const { TABLES } = require("../models/tables");

const createPending = async ({ bookingId, userId, amount, reference }) => {
  const sql = `
    INSERT INTO ${TABLES.payments}
      (booking_id, user_id, amount, paystack_reference, status)
    VALUES ($1, $2, $3, $4, 'initialized')
    RETURNING *
  `;
  const values = [bookingId, userId ?? null, amount, reference];
  const { rows } = await query(sql, values);
  return rows[0];
};

const findByReference = async (reference) => {
  const sql = `SELECT * FROM ${TABLES.payments} WHERE paystack_reference = $1 LIMIT 1`;
  const { rows } = await query(sql, [reference]);
  return rows[0] || null;
};

const markStatus = async ({ reference, status, paidAt, transactionId }) => {
  const sql = `
    UPDATE ${TABLES.payments}
    SET status = $1,
        paid_at = COALESCE($2, paid_at),
        paystack_transaction_id = COALESCE($3, paystack_transaction_id),
        updated_at = NOW()
    WHERE paystack_reference = $4
    RETURNING *
  `;
  const values = [status, paidAt ?? null, transactionId ?? null, reference];
  const { rows } = await query(sql, values);
  return rows[0] || null;
};

const listPayments = async ({ status, from, to } = {}) => {
  const conditions = [];
  const values = [];
  let idx = 1;

  if (status) {
    conditions.push(`p.status = $${idx}`);
    values.push(status);
    idx += 1;
  }
  if (from) {
    conditions.push(`p.created_at >= $${idx}`);
    values.push(from);
    idx += 1;
  }
  if (to) {
    conditions.push(`p.created_at <= $${idx}`);
    values.push(to);
    idx += 1;
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const sql = `
    SELECT p.*, b.guest_name, b.guest_email, b.check_in, b.check_out, r.name AS room_name
    FROM ${TABLES.payments} p
    LEFT JOIN ${TABLES.bookings} b ON p.booking_id = b.id
    LEFT JOIN ${TABLES.rooms} r ON r.id = b.room_id
    ${where}
    ORDER BY p.created_at DESC
  `;
  const { rows } = await query(sql, values);
  return rows;
};

module.exports = {
  createPending,
  findByReference,
  markStatus,
  listPayments,
};
