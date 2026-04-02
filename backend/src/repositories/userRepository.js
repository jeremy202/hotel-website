const { pool } = require("../config/db");
const { TABLES } = require("../models/tables");

async function findByEmail(email) {
  const query = `SELECT * FROM ${TABLES.users} WHERE email = $1 LIMIT 1`;
  const { rows } = await pool.query(query, [email.toLowerCase()]);
  return rows[0] || null;
}

async function findById(id) {
  const query = `SELECT id, full_name, email, role, created_at FROM ${TABLES.users} WHERE id = $1 LIMIT 1`;
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
}

async function createUser({ fullName, email, passwordHash, role = "customer" }) {
  const query = `
    INSERT INTO ${TABLES.users} (full_name, email, password_hash, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, full_name, email, role, created_at
  `;
  const values = [fullName, email.toLowerCase(), passwordHash, role];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = {
  findByEmail,
  findById,
  createUser,
};
