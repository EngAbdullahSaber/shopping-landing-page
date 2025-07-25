import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { Package, Truck, Shield } from "lucide-react";

export default function OrderSummary() {
  const { cart, totalItems, totalPrice } = useCart();

  const shipping = 9.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-4 h-fit"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Package className="w-5 h-5 mr-2 text-blue-600" />
        Order Summary
      </h3>

      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-start py-3 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-800 text-sm leading-tight">
                {item.name}
              </h4>
              <p className="text-gray-500 text-xs mt-1">
                Qty: {item.quantity} × ${item.price.toFixed(2)}
              </p>
            </div>
            <p className="font-semibold text-gray-800 ml-4">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-3 pb-4 border-b border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({totalItems} items)</span>
          <span className="font-medium">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 flex items-center">
            <Truck className="w-4 h-4 mr-1" />
            Shipping
          </span>
          <span className="font-medium">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
      </div>

      <motion.div
        className="flex justify-between items-center mt-4 mb-6"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-lg font-bold text-gray-800">Total</span>
        <span className="text-xl font-bold text-blue-600">
          ${finalTotal.toFixed(2)}
        </span>
      </motion.div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center text-blue-700 text-sm font-medium mb-2">
          <Shield className="w-4 h-4 mr-2" />
          Protected Purchase
        </div>
        <p className="text-blue-600 text-xs">
          Your order is protected by our 30-day money-back guarantee and secure
          payment processing.
        </p>
      </div>
    </motion.div>
  );
}
