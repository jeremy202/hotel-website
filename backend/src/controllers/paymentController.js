const asyncHandler = require("../utils/asyncHandler");
const paymentService = require("../services/paymentService");

const initializePayment = asyncHandler(async (req, res) => {
  const payment = await paymentService.initializePayment({
    bookingId: Number(req.body.bookingId),
    email: req.body.email,
    callbackUrl: req.body.callbackUrl,
  });

  res.status(200).json({
    message: "Payment initialized",
    data: payment,
  });
});

const verifyPayment = asyncHandler(async (req, res) => {
  const reference = req.params.reference || req.body.reference;
  const result = await paymentService.verifyPayment(reference);

  res.status(200).json({
    message: "Payment verification complete",
    data: result,
  });
});

module.exports = {
  initializePayment,
  verifyPayment,
};
