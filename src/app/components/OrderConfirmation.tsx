import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Package,
  Mail,
  Calendar,
  Truck,
  Box,
  Home,
} from "lucide-react";

interface OrderConfirmationProps {
  onStartOver: () => void;
}

export default function OrderConfirmation({
  onStartOver,
}: OrderConfirmationProps) {
  const orderNumber = `ORD-${Math.random()
    .toString(36)
    .substr(2, 9)
    .toUpperCase()}`;
  const estimatedDelivery = new Date(
    Date.now() + 5 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 max-w-2xl mx-auto"
    >
      {/* Confirmation Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-green-500 stroke-[1.5]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
        >
          Order Confirmed!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 max-w-md mx-auto"
        >
          Thank you for your purchase. We've sent a confirmation email with your
          order details.
        </motion.p>
      </div>

      {/* Order Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <Package className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-lg font-semibold text-gray-800">
            Order #{orderNumber}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-center">
            <Mail className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
            <span>Confirmation sent to your email</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
            <span>Estimated delivery: {estimatedDelivery}</span>
          </div>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Truck className="w-5 h-5 text-blue-500 mr-2" />
          What happens next?
        </h3>

        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-blue-600 font-medium text-xs">1</span>
            </div>
            <div>
              <p className="font-medium text-gray-800">Order Processing</p>
              <p className="text-gray-600 text-sm">
                We're preparing your items for shipment within 1-2 business
                days.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-blue-600 font-medium text-xs">2</span>
            </div>
            <div>
              <p className="font-medium text-gray-800">Shipping Updates</p>
              <p className="text-gray-600 text-sm">
                You'll receive tracking information via email once your order
                ships.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-blue-600 font-medium text-xs">3</span>
            </div>
            <div>
              <p className="font-medium text-gray-800">Delivery</p>
              <p className="text-gray-600 text-sm">
                Your package will arrive at your specified address.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-2.5 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
        >
          <Box className="w-4 h-4" />
          Track Order
        </motion.button>
        <motion.button
          whileHover={{
            scale: 1.02,
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartOver}
          className="flex-1 py-2.5 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          Continue Shopping
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
