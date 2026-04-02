const { Router } = require("express");
const paymentController = require("../controllers/paymentController");
const auth = require("../middleware/auth");
const validateRequest = require("../middleware/validateRequest");
const {
  initializePaymentValidator,
  verifyPaymentBodyValidator,
  verifyPaymentParamValidator,
} = require("../validators/paymentValidators");

const router = Router();

router.post(
  "/initialize",
  auth.authenticate,
  initializePaymentValidator,
  validateRequest,
  paymentController.initializePayment,
);

router.post("/verify", verifyPaymentBodyValidator, validateRequest, paymentController.verifyPayment);
router.get("/verify/:reference", verifyPaymentParamValidator, validateRequest, paymentController.verifyPayment);

module.exports = router;
