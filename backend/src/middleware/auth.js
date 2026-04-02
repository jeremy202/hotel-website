const jwt = require("jsonwebtoken");
const env = require("../config/env");
const ApiError = require("../utils/apiError");

function authenticate(req, _res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return next(new ApiError(401, "Unauthorized"));
  }

  const token = header.split(" ")[1];
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.user = payload;
    return next();
  } catch {
    return next(new ApiError(401, "Invalid or expired token"));
  }
}

function authorize(...roles) {
  const normalized = roles.map((role) => String(role).toLowerCase());
  return (req, _res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized"));
    }

    if (normalized.length && !normalized.includes(String(req.user.role).toLowerCase())) {
      return next(new ApiError(403, "Forbidden"));
    }

    return next();
  };
}

function auth(roles = []) {
  const acceptedRoles = Array.isArray(roles) ? roles : [roles];
  const roleGuard = authorize(...acceptedRoles);

  return (req, res, next) => {
    authenticate(req, res, (error) => {
      if (error) {
        return next(error);
      }
      return roleGuard(req, res, next);
    });
  };
}

auth.authenticate = authenticate;
auth.authorize = authorize;

module.exports = auth;
