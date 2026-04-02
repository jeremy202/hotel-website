const bcrypt = require("bcryptjs");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");
const userRepository = require("../repositories/userRepository");
const tokenService = require("../services/tokenService");

const register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new ApiError(409, "An account with this email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await userRepository.createUser({
    fullName,
    email,
    passwordHash,
  });

  const token = tokenService.signUserToken(user);
  res.status(201).json({
    message: "User registered successfully",
    data: {
      token,
      user: tokenService.safeUser(user),
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = tokenService.signUserToken(user);
  res.status(200).json({
    message: "Login successful",
    data: {
      token,
      user: tokenService.safeUser(user),
    },
  });
});

module.exports = {
  register,
  login,
};
