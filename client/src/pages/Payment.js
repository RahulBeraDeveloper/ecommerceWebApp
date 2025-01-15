import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";
import './payment.css'

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  // Function to trigger confetti animation
  const handlePaymentSuccess = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 10000); // Confetti lasts 10 seconds
  };
  return (
    <div className="container p-5 text-center">
         {showConfetti && (
        <div className="confetti">
          {[...Array(50)].map((_, index) => (
            <div key={index} className="confetti-piece"></div>
          ))}
        </div>
      )}
      <h4>Complete your purchase</h4>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2 custom-small-screen">
        <StripeCheckout onPaymentSuccess={handlePaymentSuccess} />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
