"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "../context/CheckoutContext";
import { ShippingAddress } from "@/types";
import StepIndicator from "../components/StepIndicator";

export default function ShippingPage() {
  const router = useRouter();
  const { setShippingAddress, cartItems } = useCheckout();

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartItems.length) {
      router.replace("/checkout");
    }
  }, [cartItems, router]);

  const [form, setForm] = useState<ShippingAddress>({
    fullName: "",
    email: "",
    phone: "",
    pinCode: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState<Partial<ShippingAddress>>({});

  // Validation rules
  const validateField = (name: keyof ShippingAddress, value: string) => {
    let error: string | undefined;

    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Full name is required";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Enter a valid email address";
        break;
      case "phone":
        if (!/^\d{10}$/.test(value)) error = "Phone must be 10 digits";
        break;
      case "pinCode":
        if (!value.trim()) error = "PIN Code is required";
        break;
      case "city":
        if (!value.trim()) error = "City is required";
        break;
      case "state":
        if (!value.trim()) error = "State is required";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as {
      name: keyof ShippingAddress;
      value: string;
    };

    setForm((prev) => ({ ...prev, [name]: value }));

    // Live validation
    validateField(name, value);
  };

  // Final validation before submit
  const validateForm = () => {
    Object.entries(form).forEach(([key, value]) =>
      validateField(key as keyof ShippingAddress, value),
    );

    return (
      Object.values(errors).every((e) => !e) &&
      Object.values(form).every((v) => v.trim() !== "")
    );
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setShippingAddress(form);
    router.push("/checkout/payment");
  };

  // Enable button only if no errors and all fields filled
  const isFormValid =
    Object.values(errors).every((e) => !e) &&
    Object.values(form).every((v) => v.trim() !== "");

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg shadow-md">
      <StepIndicator currentStep={2} />

      <h1 className="text-2xl font-bold mb-6 text-white">Shipping Details</h1>

      <div className="space-y-5">
        {(Object.keys(form) as (keyof ShippingAddress)[]).map((field) => (
          <div key={field}>
            <label className="block mb-1 font-medium text-white">
              {field
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              maxLength={field === "phone" ? 10 : undefined}
              className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors[field] && (
              <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isFormValid}
        className="mt-8 w-full bg-black text-white py-3 rounded hover:opacity-80 hover:cursor-pointer transition disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        Continue to Payment
      </button>
    </div>
  );
}
