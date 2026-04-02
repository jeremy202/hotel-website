const { query } = require("../config/db");
const { TABLES } = require("../models/tables");

async function list(filters = {}) {
  const { minPrice, maxPrice, type, available } = filters;
  const conditions = [];
  const values = [];

  if (minPrice) {
    values.push(Number(minPrice));
    conditions.push(`r.price_per_night >= $${values.length}`);
  }
  if (maxPrice) {
    values.push(Number(maxPrice));
    conditions.push(`r.price_per_night <= $${values.length}`);
  }
  if (type) {
    values.push(type);
    conditions.push(`r.room_type = $${values.length}`);
  }
  if (available === "true") {
    conditions.push("r.is_available = true");
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const sql = `
    SELECT
      r.*,
      COALESCE(
        json_agg(
          json_build_object('id', ri.id, 'image_url', ri.image_url, 'sort_order', ri.sort_order)
          ORDER BY ri.sort_order ASC
        ) FILTER (WHERE ri.id IS NOT NULL),
        '[]'
      ) AS images
    FROM ${TABLES.rooms} r
    LEFT JOIN ${TABLES.roomImages} ri ON ri.room_id = r.id
    ${whereClause}
    GROUP BY r.id
    ORDER BY r.created_at DESC
  `;
  const { rows } = await query(sql, values);
  return rows;
}

async function findById(id) {
  const sql = `
    SELECT
      r.*,
      COALESCE(
        json_agg(
          json_build_object('id', ri.id, 'image_url', ri.image_url, 'sort_order', ri.sort_order)
          ORDER BY ri.sort_order ASC
        ) FILTER (WHERE ri.id IS NOT NULL),
        '[]'
      ) AS images
    FROM ${TABLES.rooms} r
    LEFT JOIN ${TABLES.roomImages} ri ON ri.room_id = r.id
    WHERE r.id = $1
    GROUP BY r.id
  `;
  const { rows } = await query(sql, [id]);
  return rows[0] || null;
}

async function create(room) {
  const { slug, name, roomType, description, pricePerNight, maxGuests, amenities = [], isAvailable = true } = room;
  const sql = `
    INSERT INTO ${TABLES.rooms} (slug, name, room_type, description, price_per_night, max_guests, amenities, is_available)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *
  `;
  const { rows } = await query(sql, [
    slug,
    name,
    roomType,
    description,
    Number(pricePerNight),
    Number(maxGuests),
    amenities,
    isAvailable
  ]);
  return rows[0];
}

async function update(id, patch) {
  const mapping = {
    slug: "slug",
    name: "name",
    roomType: "room_type",
    description: "description",
    pricePerNight: "price_per_night",
    maxGuests: "max_guests",
    amenities: "amenities",
    isAvailable: "is_available",
  };

  const fields = [];
  const values = [];
  Object.entries(patch).forEach(([key, value]) => {
    if (mapping[key] !== undefined) {
      values.push(value);
      fields.push(`${mapping[key]} = $${values.length}`);
    }
  });

  if (!fields.length) {
    return findById(id);
  }

  values.push(id);
  const sql = `
    UPDATE ${TABLES.rooms}
    SET ${fields.join(", ")}, updated_at = NOW()
    WHERE id = $${values.length}
    RETURNING *
  `;
  const { rows } = await query(sql, values);
  return rows[0] || null;
}

async function remove(id) {
  const { rowCount } = await query(`DELETE FROM ${TABLES.rooms} WHERE id = $1`, [id]);
  return rowCount > 0;
}

async function replaceImages(roomId, imageUrls = []) {
  await query(`DELETE FROM ${TABLES.roomImages} WHERE room_id = $1`, [roomId]);
  for (let idx = 0; idx < imageUrls.length; idx += 1) {
    await query(
      `INSERT INTO ${TABLES.roomImages} (room_id, image_url, sort_order) VALUES ($1,$2,$3)`,
      [roomId, imageUrls[idx], idx]
    );
  }
  return findById(roomId);
}

async function getFeatured(limit = 3) {
  const sql = `
    SELECT
      r.*,
      COALESCE(
        json_agg(
          json_build_object('id', ri.id, 'image_url', ri.image_url, 'sort_order', ri.sort_order)
          ORDER BY ri.sort_order ASC
        ) FILTER (WHERE ri.id IS NOT NULL),
        '[]'
      ) AS images
    FROM ${TABLES.rooms} r
    LEFT JOIN ${TABLES.roomImages} ri ON ri.room_id = r.id
    WHERE r.is_available = true
    GROUP BY r.id
    ORDER BY r.price_per_night DESC
    LIMIT $1
  `;
  const { rows } = await query(sql, [Number(limit)]);
  return rows;
}

module.exports = {
  list,
  findById,
  create,
  update,
  remove,
  replaceImages,
  getFeatured,
};
