import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface CheckoutStepsProps {
  currentStep: number;
  steps: Array<{
    id: number;
    title: string;
    icon: React.ComponentType<any>;
  }>;
}

export default function CheckoutSteps({
  currentStep,
  steps,
}: CheckoutStepsProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-200">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: "0%" }}
            animate={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </div>

        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const IconComponent = step.icon;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center relative z-10"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{
                  scale: isCurrent || isCompleted ? 1 : 0.8,
                  backgroundColor: isCompleted
                    ? "#10B981"
                    : isCurrent
                    ? "#3B82F6"
                    : "#E5E7EB",
                }}
                transition={{ duration: 0.2 }}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${
                    isCompleted
                      ? "bg-green-500"
                      : isCurrent
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }
                  shadow-lg
                `}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Check className="w-6 h-6 text-white" />
                  </motion.div>
                ) : (
                  <IconComponent
                    className={`w-6 h-6 ${
                      isCurrent ? "text-white" : "text-gray-500"
                    }`}
                  />
                )}
              </motion.div>

              <motion.p
                className={`
                  mt-2 text-sm font-medium text-center max-w-20
                  ${
                    isCurrent || isCompleted ? "text-gray-800" : "text-gray-500"
                  }
                `}
                animate={{
                  color: isCurrent || isCompleted ? "#1F2937" : "#6B7280",
                }}
              >
                {step.title}
              </motion.p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
