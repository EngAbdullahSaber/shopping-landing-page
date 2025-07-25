import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Lock, Calendar, User } from "lucide-react";

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  saveCard: boolean;
}

interface PaymentFormProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PaymentForm({ onNext, onBack }: PaymentFormProps) {
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    saveCard: false,
  });

  const [errors, setErrors] = useState<Partial<PaymentData>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    let formattedValue = value;
    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (name === "expiryDate") {
      formattedValue = formatExpiryDate(value);
    } else if (name === "cvv") {
      formattedValue = value.replace(/[^0-9]/g, "").substring(0, 4);
    }

    setPaymentData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : formattedValue,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof PaymentData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentData> = {};

    if (!paymentData.cardNumber.replace(/\s/g, "")) {
      newErrors.cardNumber = "Card number is required";
    } else if (paymentData.cardNumber.replace(/\s/g, "").length < 13) {
      newErrors.cardNumber = "Card number is invalid";
    }

    if (!paymentData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
      newErrors.expiryDate = "Expiry date is invalid";
    }

    if (!paymentData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (paymentData.cvv.length < 3) {
      newErrors.cvv = "CVV is invalid";
    }

    if (!paymentData.cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsProcessing(true);
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsProcessing(false);
      onNext();
    }
  };

  const getCardType = (number: string) => {
    const cleanNumber = number.replace(/\s/g, "");
    if (cleanNumber.startsWith("4")) return "visa";
    if (cleanNumber.startsWith("5")) return "mastercard";
    if (cleanNumber.startsWith("3")) return "amex";
    return "generic";
  };

  const inputClasses = (fieldName: keyof PaymentData) => `
    w-full px-4 py-3 border rounded-lg transition-all duration-200 
    ${
      errors[fieldName]
        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
        : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
    }
    focus:ring-2 focus:outline-none
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <CreditCard className="w-6 h-6 mr-3 text-blue-600" />
        Payment Information
      </h2>

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl mb-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-8"></div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div className="w-12 h-8 bg-white/20 rounded"></div>
            <div className="text-right">
              <div className="text-sm opacity-75">Card Type</div>
              <div className="font-semibold capitalize">
                {getCardType(paymentData.cardNumber)}
              </div>
            </div>
          </div>

          <div className="text-2xl font-mono tracking-wider mb-6">
            {paymentData.cardNumber || "•••• •••• •••• ••••"}
          </div>

          <div className="flex justify-between">
            <div>
              <div className="text-xs opacity-75">CARDHOLDER</div>
              <div className="font-semibold">
                {paymentData.cardholderName || "YOUR NAME"}
              </div>
            </div>
            <div>
              <div className="text-xs opacity-75">EXPIRES</div>
              <div className="font-semibold">
                {paymentData.expiryDate || "MM/YY"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
            <CreditCard className="w-4 h-4 mr-1" />
            Card Number *
          </label>
          <input
            type="text"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleInputChange}
            className={inputClasses("cardNumber")}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />
          {errors.cardNumber && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.cardNumber}
            </motion.p>
          )}
        </div>

        <div>
          <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
            <User className="w-4 h-4 mr-1" />
            Cardholder Name *
          </label>
          <input
            type="text"
            name="cardholderName"
            value={paymentData.cardholderName}
            onChange={handleInputChange}
            className={inputClasses("cardholderName")}
            placeholder="Enter cardholder name"
          />
          {errors.cardholderName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.cardholderName}
            </motion.p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Expiry Date *
            </label>
            <input
              type="text"
              name="expiryDate"
              value={paymentData.expiryDate}
              onChange={handleInputChange}
              className={inputClasses("expiryDate")}
              placeholder="MM/YY"
              maxLength={5}
            />
            {errors.expiryDate && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.expiryDate}
              </motion.p>
            )}
          </div>

          <div>
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Lock className="w-4 h-4 mr-1" />
              CVV *
            </label>
            <input
              type="text"
              name="cvv"
              value={paymentData.cvv}
              onChange={handleInputChange}
              className={inputClasses("cvv")}
              placeholder="123"
              maxLength={4}
            />
            {errors.cvv && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.cvv}
              </motion.p>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="saveCard"
            name="saveCard"
            checked={paymentData.saveCard}
            onChange={handleInputChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label
            htmlFor="saveCard"
            className="ml-2 text-sm text-gray-700 flex items-center"
          >
            <Lock className="w-3 h-3 mr-1" />
            Save this card for future purchases (secure)
          </label>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center text-gray-600 text-sm">
            <Lock className="w-4 h-4 mr-2 text-green-500" />
            Your payment information is encrypted and secure. We use
            industry-standard SSL encryption.
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <motion.button
            type="button"
            onClick={onBack}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            disabled={isProcessing}
          >
            Back
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{
              scale: isProcessing ? 1 : 1.02,
              boxShadow: isProcessing
                ? "none"
                : "0 4px 12px rgba(59, 130, 246, 0.2)",
            }}
            whileTap={{ scale: isProcessing ? 1 : 0.98 }}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </div>
            ) : (
              "Complete Order"
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
