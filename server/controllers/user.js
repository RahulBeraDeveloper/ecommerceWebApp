const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");
const uniqueid = require("uniqueid");
exports.userCart = async (req, res) => {
  // console.log(req.body); // {cart: []}
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  // check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log("removed old cart");
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    // get price for creating total
    let { price } = await Product.findById(cart[i]._id).select("price").exec();
    object.price = price;

    products.push(object);
  }

  // console.log('products', products)

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  // console.log("cartTotal", cartTotal);

  let newCart = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save();

  console.log("new cart", newCart);
  res.json({ ok: true });
};


exports.getUserCart = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).exec();
  
    let cart = await Cart.findOne({ orderdBy: user._id })
      .populate("products.product", "_id title price totalAfterDiscount")
      .exec();
  
    const { products, cartTotal, totalAfterDiscount } = cart;
    res.json({ products, cartTotal, totalAfterDiscount });
  };


  exports.emptyCart = async (req, res) => {
    console.log("empty cart");
    const user = await User.findOne({ email: req.user.email }).exec();
  
    const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();
    res.json(cart);
  };
  
  // exports.saveAddress = async (req, res) => {
  //   const userAddress = await User.findOneAndUpdate(
  //     { email: req.user.email },
  //     { address: req.body.address }
  //   ).exec();
  
  //   res.json({ ok: true });
  // };

  exports.saveAddress = async (req, res) => {
    try {
      const { address, phone } = req.body; // Destructure address and phone from the request body
  
      // Validate phone (if needed on the server side)
      if (!/^\d{10}$/.test(phone)) {
        return res.status(400).json({ error: "Phone number must be exactly 10 digits." });
      }
  
      // Update user's address and phone
      const userAddress = await User.findOneAndUpdate(
        { email: req.user.email },
        { 
          address: address,
          phone: phone
        },
        { new: true } // Return the updated document
      ).exec();
  
      res.json({ ok: true, user: userAddress });
    } catch (error) {
      console.error("Error saving address and phone:", error);
      res.status(500).json({ error: "Failed to save address and phone." });
    }
  };
  
  // exports.saveAddress = async (req, res) => {
  //   const { firstName, lastName, companyName, address } = req.body;
    
  //   try {
  //     const user = await User.findOneAndUpdate(
  //       { email: req.user.email },
  //       { firstName, lastName, companyName, address },
  //       { new: true }
  //     );
      
  //     if (!user) {
  //       return res.status(400).json({ error: "User not found" });
  //     }
      
  //     res.json({ ok: true, user });
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ error: "Error saving address and user info" });
  //   }
  // };


  // Function to get the saved address of the logged-in user
// exports.getUserAddress = async (req, res) => {
//   try {
//     // Find the user by email (authenticated user)
//     const user = await User.findOne({ email: req.user.email });

//     if (!user) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     // Return the user information including the saved address
//     const { firstName, lastName, companyName, address } = user;
//     res.json({ firstName, lastName, companyName, address });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error fetching user address" });
//   }
// };
exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body;
  console.log("COUPON", coupon);

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();
  if (!validCoupon) {
    return res.json({
      err: "Invalid coupon",
    });
  }
  console.log("VALID COUPON", validCoupon);
  console.log("VALID COUPON", validCoupon);

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products, cartTotal } = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price")
    .exec();

  console.log("cartTotal", cartTotal, "discount%", validCoupon.discount);

  // calculate the total after discount
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2); // 99.99

  Cart.findOneAndUpdate(
    { orderdBy: user._id },
    { totalAfterDiscount },
    { new: true }
  );

  res.json(totalAfterDiscount);
};



// exports.createOrder = async (req, res) => {
//   // console.log(req.body);
//   // return;
//   const { paymentIntent } = req.body.stripeResponse;

//   const user = await User.findOne({ email: req.user.email }).exec();

//   let { products } = await Cart.findOne({ orderdBy: user._id }).exec();

//   let newOrder = await new Order({
//     products,
//     paymentIntent,
//     orderdBy: user._id,
//   }).save();

//   console.log("NEW ORDER SAVED", newOrder);
//   res.json({ ok: true });
// };



exports.createOrder = async (req, res) => {
  // console.log(req.body);
  // return;
  const { paymentIntent } = req.body.stripeResponse;

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products } = await Cart.findOne({ orderdBy: user._id }).exec();

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderdBy: user._id,
  }).save();

  // decrement quantity, increment sold
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});
  console.log("PRODUCT QUANTITY-- AND SOLD++", updated);

  console.log("NEW ORDER SAVED", newOrder);
  res.json({ ok: true });
};




exports.orders = async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).exec();

  let userOrders = await Order.find({ orderdBy: user._id })
    .populate("products.product")
    .exec();

  res.json(userOrders);
};



// addToWishlist wishlist removeFromWishlist
exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};

exports.wishlist = async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();

  res.json(list);
};

exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};

// exports.createCashOrder = async (req, res) => {
//   const { COD } = req.body;
//   // if COD is true, create order with status of Cash On Delivery

//   if (!COD) return res.status(400).send("Create cash order failed");

//   const user = await User.findOne({ email: req.user.email }).exec();

//   let userCart = await Cart.findOne({ orderdBy: user._id }).exec();

//   let newOrder = await new Order({
//     products: userCart.products,
//     paymentIntent: {
//       id: uniqueid(),
//       amount: userCart.cartTotal,
//       currency: "usd",
//       status: "Cash On Delivery",
//       created: Date.now(),
//       payment_method_types: ["cash"],
//     },
//     orderdBy: user._id,
//   }).save();

//   // decrement quantity, increment sold
//   let bulkOption = userCart.products.map((item) => {
//     return {
//       updateOne: {
//         filter: { _id: item.product._id }, // IMPORTANT item.product
//         update: { $inc: { quantity: -item.count, sold: +item.count } },
//       },
//     };
//   });

//   let updated = await Product.bulkWrite(bulkOption, {});
//   console.log("PRODUCT QUANTITY-- AND SOLD++", updated);

//   console.log("NEW ORDER SAVED", newOrder);
//   res.json({ ok: true });
// };




exports.createCashOrder = async (req, res) => {
  const { COD, couponApplied } = req.body;
  // if COD is true, create order with status of Cash On Delivery

  if (!COD) return res.status(400).send("Create cash order failed");

  const user = await User.findOne({ email: req.user.email }).exec();

  let userCart = await Cart.findOne({ orderdBy: user._id }).exec();

  let finalAmount = 0;

  if (couponApplied && userCart.totalAfterDiscount) {
    finalAmount = userCart.totalAfterDiscount * 100;
  } else {
    finalAmount = userCart.cartTotal * 100;
  }

  let newOrder = await new Order({
    products: userCart.products,
    paymentIntent: {
      id: uniqueid(),
      amount: finalAmount,
      currency: "usd",
      status: "Cash On Delivery",
      created: Date.now(),
      payment_method_types: ["cash"],
    },
    orderdBy: user._id,
    orderStatus: "Cash On Delivery",
  }).save();

  // decrement quantity, increment sold
  let bulkOption = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});
  console.log("PRODUCT QUANTITY-- AND SOLD++", updated);

  console.log("NEW ORDER SAVED", newOrder);
  res.json({ ok: true });
};

// In your backend controller, add a new function to fetch the address and phone
exports.getAddressPhone = async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(400).json({ message: "Email not provided" });
    }

    let user = await User.findOne({ email: req.user.email }).exec();
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Don't perform phone number validation here as it's optional
    res.json({
      address: user.address || "",
      phone: user.phone || "", // Return empty string if phone is not set
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("Error fetching address/phone");
  }
};





exports.getUserDetails = async (req, res) => {
  try {
    // Find the user based on their email from the request
    const user = await User.findOne({ email: req.user.email })
      .select("phone address email") // Fetch only the necessary fields
      .exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with user details
    res.json({
      phone: user.phone || "",
      address: user.address || "",
      email: user.email, // Include email for consistency
    });
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};



exports.updateUserDetailsById = async (req, res) => {
  try {
    // Extract user ID from request parameters
    const { userId } = req.params;

    // Destructure the fields to be updated from the request body
    const { phone, address } = req.body;

    // Ensure at least one field is provided for update
    if (!phone && !address) {
      return res.status(400).json({ error: "No fields to update provided." });
    }

    // Update the user based on their ID
    const updatedUser = await User.findByIdAndUpdate(
      userId, // Match the user by ID
      { 
        ...(phone && { phone }), 
        ...(address && { address }) 
      }, // Only update phone and address
      { new: true, select: "phone address email" } // Return updated fields excluding email from updates
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with the updated user details
    res.json({
      phone: updatedUser.phone || "",
      address: updatedUser.address || "",
      email: updatedUser.email, // Email is returned but not modifiable
    });
  } catch (error) {
    console.error("Error updating user details:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
