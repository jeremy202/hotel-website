const fs = require("fs");
const path = require("path");
const { pool } = require("../config/db");
const logger = require("../config/logger");

const run = async () => {
  const migrationsDir = path.join(__dirname, "migrations");
  const files = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    logger.info(`Running migration: ${file}`);
    await pool.query(sql);
  }

  logger.info("Migrations complete.");
  await pool.end();
};

run().catch(async (error) => {
  logger.error(error, "Migration failed");
  await pool.end();
  process.exit(1);
});
