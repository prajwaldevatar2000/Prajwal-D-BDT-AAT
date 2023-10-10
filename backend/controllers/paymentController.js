const catchAsyncError = require("../middleware/catchAsyncError");

const stripe = require("stripe")('sk_test_51N9CbdSEXagQe57IBdGRVKLa1B3BVi1IiPqeTEJaW7tKCAgdLxivYQQesRzlHfZxEDwmm0qU3knIl4WoqGXPJ6eD00oPzRiisH');

exports.processPayment = catchAsyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce Master",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
