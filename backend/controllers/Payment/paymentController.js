const { instance } = require("../../app");
const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");
const ErrorHandler = require("../../utils/ErrorHandler");
const prisma = new PrismaClient();
function hmac_sha256(data, key) {
  return crypto.createHmac("sha256", key).update(data).digest("hex");
}
exports.checkout = async (req, res, next) => {
  try {
    const options = {
      amount: 2000,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    // console.log(order);
    res.status(200).json({
      order,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getApiKey = async (req, res, next) => {
  try {
    res.status(200).json({
      key: process.env.RAZORPAY_ID,
    });
  } catch (error) {
    res.json(error.message);
  }
};
exports.paymentVerification = async (req, res, next) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    name,
    email,
  } = req.body;
  const generated_signature = hmac_sha256(
    razorpay_order_id + "|" + razorpay_payment_id,
    process.env.RAZORPAY_SECRET
  );
  //   console.log(generated_signature, razorpay_signature);
  if (generated_signature === razorpay_signature) {
    // payment is successful
    const payment = await prisma.Payment.create({
      data: {
        name,
        email,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        PaymentStatus: true,
      },
    });
    // console.log(payment);
    return res.redirect(
      `http://localhost:5173/paymentSuccess?reference=${razorpay_payment_id}`
    );
  }
  res.json({
    success: false,
  });
};

exports.checkPayment = async (req, res, next) => {
  try {
    const { email } = req.query;
    console.log(email);
    const data = await prisma.Payment.findUnique({
      where: {
        email,
      },
    });
    if (!data) {
      return res.json({
        success: false,
        message: "Payment not done yet",
      });
    }
    res.json({
      success: true,
      payment: data,
      message: "Payment done successfully",
    });
  } catch (error) {
    return next(new ErrorHandler("Error while payment", 404));
  }
};
