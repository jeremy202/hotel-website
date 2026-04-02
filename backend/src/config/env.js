const dotenv = require("dotenv");

dotenv.config();

const requiredKeys = ["DATABASE_URL", "JWT_SECRET", "PAYSTACK_SECRET_KEY"];

for (const key of requiredKeys) {
  if (!process.env[key]) {
    // eslint-disable-next-line no-console
    console.warn(`[env] Missing environment variable: ${key}`);
  }
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  databaseUrl:
    process.env.DATABASE_URL ||
    `postgresql://${process.env.DB_USER || "postgres"}:${process.env.DB_PASSWORD || "postgres"}@${process.env.DB_HOST || "localhost"}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || "grand_comodores"}`,
  jwtSecret: process.env.JWT_SECRET || "",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  paystackSecretKey: process.env.PAYSTACK_SECRET_KEY || "",
  paystackBaseUrl: process.env.PAYSTACK_BASE_URL || "https://api.paystack.co",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  smtpHost: process.env.SMTP_HOST || "smtp.gmail.com",
  smtpPort: Number(process.env.SMTP_PORT || 587),
  smtpUser: process.env.SMTP_USER || "",
  smtpPass: process.env.SMTP_PASS || "",
  adminEmail: process.env.ADMIN_EMAIL || process.env.SMTP_USER || "",
};
