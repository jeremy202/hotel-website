const axios = require("axios");
const env = require("../config/env");
const ApiError = require("../utils/apiError");

const paystackClient = axios.create({
  baseURL: env.paystackBaseUrl,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${env.paystackSecretKey}`,
    "Content-Type": "application/json",
  },
});

const initializeTransaction = async ({ email, amountKobo, reference, metadata = {}, callbackUrl }) => {
  if (!env.paystackSecretKey) {
    throw new ApiError(500, "Paystack is not configured");
  }

  const payload = {
    email,
    amount: Math.round(Number(amountKobo)),
    reference,
    metadata,
  };
  if (callbackUrl) {
    payload.callback_url = callbackUrl;
  }

  const response = await paystackClient.post("/transaction/initialize", payload);

  if (!response.data?.status) {
    throw new ApiError(502, "Unable to initialize payment");
  }

  return response.data.data;
};

const verifyTransaction = async (reference) => {
  if (!env.paystackSecretKey) {
    throw new ApiError(500, "Paystack is not configured");
  }

  const response = await paystackClient.get(
    `/transaction/verify/${encodeURIComponent(reference)}`
  );

  if (!response.data?.status) {
    throw new ApiError(400, "Payment verification failed");
  }

  return response.data.data;
};

const buildReference = (bookingId) => {
  return `GC-${bookingId}-${Date.now()}`;
};

module.exports = {
  initializeTransaction,
  verifyTransaction,
  buildReference,
};
