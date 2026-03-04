"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCheckout } from "../context/CheckoutContext";

export default function CheckoutView() {
  const { cartItems, shippingFee, discount } = useCheckout();
  const router = useRouter();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0,
  );

  const total = subtotal + shippingFee - discount;

  if (!cartItems.length) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-medium text-white">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-white">Order Summary</h1>

      {cartItems.map((item) => (
        <div
          key={item.product_id}
          className="flex items-center justify-between mb-4 border-b border-gray-700 pb-4"
        >
          <div className="flex items-center gap-4">
            <Image
              height={16}
              width={16}
              unoptimized={true}
              src={item.image}
              alt={item.product_name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <p className="font-medium text-white">{item.product_name}</p>
              <p className="text-gray-300 text-sm">
                ₹{item.product_price} x {item.quantity}
              </p>
            </div>
          </div>
          <p className="font-semibold text-white">
            ₹{item.product_price * item.quantity}
          </p>
        </div>
      ))}

      <div className="mt-6 space-y-2 text-white">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>₹{shippingFee}</span>
        </div>

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <button
        onClick={() => router.push("/checkout/shipping")}
        disabled={!cartItems.length}
        className="mt-6 w-full bg-black text-white py-3 rounded hover:opacity-80 hover:cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
