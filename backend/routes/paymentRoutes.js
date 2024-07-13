const express = require("express");
const {
  checkout,
  getApiKey,
  paymentVerification,
  checkPayment,
} = require("../controllers/Payment/paymentController");

const router = express.Router();
router.route("/payment").post(checkout);
router.route("/getRazorKey").get(getApiKey);
router.route("/paymentVerification").post(paymentVerification);
router.route("/checkPayment").get(checkPayment);
module.exports = router;
