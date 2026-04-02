const jwt = require("jsonwebtoken");
const env = require("../config/env");

function signUserToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.full_name || user.fullName,
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
}

function generateToken(user) {
  return signUserToken(user);
}

function safeUser(user) {
  return {
    id: user.id,
    fullName: user.full_name || user.fullName,
    email: user.email,
    role: user.role,
  };
}

module.exports = {
  signUserToken,
  generateToken,
  safeUser,
};
