import CheckoutView from "./components/CheckoutView";
import StepIndicator from "./components/StepIndicator";

export default function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <StepIndicator currentStep={1} />
      <CheckoutView />
    </div>
  );
}
