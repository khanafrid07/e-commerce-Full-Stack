import { motion } from "framer-motion";
import { notifyError, notifySuccess } from "../../utils/notify";
import { useState } from "react";

export default function OfferSignup() {
  const [email, setEmail] = useState("");
  const [subscribeLoading, setSubscribeLoading] = useState(false)

  const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
  };

  const handleSubscribe = () => {
    if (!email || !isValidEmail(email)) {
      notifyError("Please enter a valid email");
      return;
    }
    notifySuccess("Subscribed successfully");
    setEmail("");

  }
  return (
    <section className="w-full py-14 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">

        <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
          Get <span className="text-red-600">10% OFF</span> Your First Order
        </h2>

        <p className="mt-3 text-gray-600 text-sm sm:text-base">
          Subscribe to our newsletter and receive exclusive offers and updates.
        </p>

        {/* form */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">

          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-4 py-3 rounded-xl border w-full sm:w-72 outline-none focus:ring-2 focus:ring-red-400"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSubscribe()}
            className="bg-red-600 text-white font-bold px-6 py-3 rounded-xl shadow-md"
          >
            Subscribe
          </motion.button>

        </div>

      </div>
    </section>
  );
}