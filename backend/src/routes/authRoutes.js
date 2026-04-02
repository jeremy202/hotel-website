const { Router } = require("express");
const { register, login } = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../validators/authValidators");
const validateRequest = require("../middleware/validateRequest");

const router = Router();

router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);

module.exports = router;
