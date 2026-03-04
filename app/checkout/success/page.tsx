"use client";

import { useEffect } from "react";
import { useCheckout } from "../context/CheckoutContext";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const { shippingAddress, cartItems, shippingFee, discount } = useCheckout();

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-6">
      <div className="max-w-3xl w-full bg-gray-800 rounded-lg shadow-md p-6 text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-500">
          Order Successful!
        </h1>
        <p className="text-gray-300 mb-6">
          Thank you{" "}
          <span className="font-medium text-white">
            {shippingAddress.fullName}
          </span>{" "}
          for shopping sustainably.
        </p>

        {/* Shipping Address */}
        <div className="rounded-lg p-4 mb-6 bg-gray-700 text-left">
          <h2 className="font-semibold mb-2 text-white">Shipping Address</h2>
          <p className="text-white">{shippingAddress.fullName}</p>
          <p className="text-white">{shippingAddress.email}</p>
          <p className="text-white">{shippingAddress.phone}</p>
          <p className="text-gray-300">
            {shippingAddress.city}, {shippingAddress.state} -{" "}
            {shippingAddress.pinCode}
          </p>
        </div>

        {/* Order Summary */}
        <div className="rounded-lg p-4 mb-6 bg-gray-700 text-left">
          <h2 className="font-semibold mb-2 text-white">Order Summary</h2>
          {cartItems.map((item) => (
            <div
              key={item.product_id}
              className="flex justify-between mb-2 text-white"
            >
              <span>
                {item.product_name} x {item.quantity}
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

        {/* Continue Shopping */}
        <button
          onClick={() => router.push("/")}
          className="w-full bg-black text-white py-3 rounded hover:opacity-80 hover:cursor-pointer transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
