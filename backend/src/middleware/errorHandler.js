const ApiError = require("../utils/apiError");
const logger = require("../config/logger");

function notFoundHandler(req, res, next) {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const isOperational = err instanceof ApiError;

  if (!isOperational) {
    logger.error(err.stack || err.message);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    details: err.details || null,
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
