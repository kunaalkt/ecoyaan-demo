import { ReactNode } from "react";
import { CheckoutProvider } from "./context/CheckoutContext";
import { CartResponse } from "@/types";

async function getCartData(): Promise<CartResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseUrl}/api/cart`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch cart");
  }

  return res.json();
}

export default async function CheckoutLayout({
  children,
}: {
  children: ReactNode;
}) {
  const data = await getCartData();

  return (
    <CheckoutProvider
      initialCartItems={data.cartItems}
      shippingFee={data.shipping_fee}
      discount={data.discount_applied}
    >
      <div className="min-h-screen">{children}</div>
    </CheckoutProvider>
  );
}
