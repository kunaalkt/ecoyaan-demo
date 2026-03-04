"use client";

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
}

const steps = ["Cart", "Shipping", "Payment"];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((step, index) => {
        const stepNumber = (index + 1) as 1 | 2 | 3;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={step} className="flex-1 text-center">
            <div
              className={`mx-auto w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
              ${
                isCompleted
                  ? "bg-green-500 text-black"
                  : isActive
                    ? "bg-white text-black"
                    : "bg-gray-700 text-gray-300"
              }`}
            >
              {stepNumber}
            </div>
            <p
              className={`mt-2 text-sm ${
                isCompleted
                  ? "text-green-400"
                  : isActive
                    ? "text-white"
                    : "text-gray-400"
              }`}
            >
              {step}
            </p>
          </div>
        );
      })}
    </div>
  );
}
