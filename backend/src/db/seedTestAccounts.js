const bcrypt = require("bcryptjs");
const { query, pool } = require("../config/db");

const TEST_USERS = [
  {
    fullName: "Grand Comodores Admin",
    email: "admin.test@grandcomodores.com",
    password: "AdminTest123!",
    role: "admin",
  },
  {
    fullName: "Grand Comodores Staff",
    email: "staff.test@grandcomodores.com",
    password: "StaffTest123!",
    role: "staff",
  },
  {
    fullName: "Grand Comodores Guest",
    email: "guest.test@grandcomodores.com",
    password: "GuestTest123!",
    role: "customer",
  },
];

async function upsertTestUser(user) {
  const passwordHash = await bcrypt.hash(user.password, 12);

  const result = await query(
    `
    INSERT INTO users (full_name, email, password_hash, role)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (email)
    DO UPDATE SET
      full_name = EXCLUDED.full_name,
      password_hash = EXCLUDED.password_hash,
      role = EXCLUDED.role
    RETURNING id, full_name, email, role, created_at
    `,
    [user.fullName, user.email.toLowerCase(), passwordHash, user.role],
  );

  return result.rows[0];
}

async function seed() {
  const created = [];
  for (const testUser of TEST_USERS) {
    created.push(await upsertTestUser(testUser));
  }

  // eslint-disable-next-line no-console
  console.log("Seeded test accounts:");
  for (const user of created) {
    // eslint-disable-next-line no-console
    console.log(`- ${user.role}: ${user.email}`);
  }
  // eslint-disable-next-line no-console
  console.log("Passwords:");
  // eslint-disable-next-line no-console
  console.log("admin.test@grandcomodores.com => AdminTest123!");
  // eslint-disable-next-line no-console
  console.log("staff.test@grandcomodores.com => StaffTest123!");
  // eslint-disable-next-line no-console
  console.log("guest.test@grandcomodores.com => GuestTest123!");
}

seed()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error("Failed to seed test accounts:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
