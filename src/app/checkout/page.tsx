"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingBag, CreditCard, MapPin } from "lucide-react";
import CheckoutSteps from "../components/CheckoutSteps";
import CheckoutForm from "../components/CheckoutForm";
import PaymentForm from "../components/PaymentForm";
import OrderConfirmation from "../components/OrderConfirmation";
import OrderSummary from "../components/OrderSummary";
import Link from "next/link";

const checkoutSteps = [
  { id: 1, title: "Shipping", icon: MapPin },
  { id: 2, title: "Payment", icon: CreditCard },
  { id: 3, title: "Confirmation", icon: ShoppingBag },
];

interface CheckoutProps {
  onBack: () => void;
}

export default function Checkout({ onBack }: CheckoutProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, checkoutSteps.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    onBack();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CheckoutForm onNext={handleNext} />;
      case 2:
        return <PaymentForm onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <OrderConfirmation onStartOver={handleStartOver} />;
      default:
        return <CheckoutForm onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <Link href={"/"}>Back to Cart</Link>
          </motion.button>
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </motion.div>

        {/* Progress Steps */}
        <CheckoutSteps currentStep={currentStep} steps={checkoutSteps} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          {currentStep !== 3 && (
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
