const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const coupon = require("../models/coupon");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  // console.log(req.body);
  const { couponApplied } = req.body;

  // later apply coupon
  // later calculate price

  // 1 find user
  const user = await User.findOne({ email: req.user.email }).exec();
  // 2 get user cart total
  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderdBy: user._id,
  }).exec();
  // console.log("CART TOTAL", cartTotal, "AFTER DIS%", totalAfterDiscount);

  let finalAmount = 0;

  if (couponApplied && totalAfterDiscount) {
<<<<<<< HEAD
    finalAmount = totalAfterDiscount * 100; // Use 100 for cents conversion
  } else {
    finalAmount = cartTotal * 100; // Use 100 for cents conversion
=======
    finalAmount = totalAfterDiscount;
  } else {
    finalAmount = cartTotal;
>>>>>>> 0649d1b58a46d18962749f46de4bab705b5765d1
  }
  
  console.log("Cart Total:", cartTotal); // Should log 750 if in dollars
  console.log("Total After Discount:", totalAfterDiscount); // Should log discount value
  

  // create payment intent with order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount,
  });
};
