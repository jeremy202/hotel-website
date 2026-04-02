const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const env = require("./config/env");
const routes = require("./routes");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");
const logger = require("./config/logger");

const app = express();

app.use(helmet());
app.use(cors({ origin: env.frontendUrl }));
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "grand-comodores-api",
    environment: env.nodeEnv,
    timestamp: new Date().toISOString()
  });
});

app.use("/api/v1", routes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
  logger.info(`API running on port ${env.port}`);
});
