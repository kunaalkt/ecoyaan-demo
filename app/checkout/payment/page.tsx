"use client";

import { useRouter } from "next/navigation";
import { useCheckout } from "../context/CheckoutContext";
import StepIndicator from "../components/StepIndicator";
import { useEffect } from "react";

export default function PaymentPage() {
  const router = useRouter();
  const { cartItems, shippingAddress, shippingFee, discount } = useCheckout();

  // Route guard
  useEffect(() => {
    if (!shippingAddress || !cartItems.length) {
      router.replace("/checkout");
    }
  }, [shippingAddress, cartItems, router]);

  if (!shippingAddress || !cartItems.length) {
    return null;
  }

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0,
  );

  const total = subtotal + shippingFee - discount;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg shadow-md">
      <StepIndicator currentStep={3} />

      {/* Shipping Address */}
      <div className="mb-6 p-4 bg-gray-800 rounded">
        <h2 className="font-bold text-lg mb-2 text-white">Shipping Address</h2>
        <p className="text-white">{shippingAddress.fullName}</p>
        <p className="text-white">{shippingAddress.email}</p>
        <p className="text-white">{shippingAddress.phone}</p>
        <p className="text-gray-300">
          {shippingAddress.city}, {shippingAddress.state} -{" "}
          {shippingAddress.pinCode}
        </p>
      </div>

      {/* Order Summary */}
      <div className="mb-6 p-4 bg-gray-800 rounded">
        <h2 className="font-bold text-lg mb-2 text-white">Order Summary</h2>
        {cartItems.map((item) => (
          <div
            key={item.product_id}
            className="flex justify-between text-white mb-1"
          >
            <span>
              {item.product_name} × {item.quantity}
            </span>
            <span>₹{item.product_price * item.quantity}</span>
          </div>
        ))}
        <hr className="my-2 border-gray-600" />
        <div className="flex justify-between text-gray-300">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Shipping</span>
          <span>₹{shippingFee}</span>
        </div>
        <div className="flex justify-between font-bold text-white text-lg">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={() => router.push("/checkout/success")}
        className="w-full bg-green-600 text-white py-3 rounded hover:opacity-80 hover:cursor-pointer transition"
      >
        Pay Total Amount
      </button>
    </div>
  );
}
