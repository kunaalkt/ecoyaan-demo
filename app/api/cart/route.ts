import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    cartItems: [
      {
        product_id: 101,
        product_name: "Bamboo Toothbrush (Pack of 4)",
        product_price: 299,
        quantity: 2,
        image: "https://placehold.co/600x400/orange/white?text=B",
      },
      {
        product_id: 102,
        product_name: "Reusable Cotton Produce Bags",
        product_price: 450,
        quantity: 1,
        image: "https://placehold.co/600x400/orange/white?text=R",
      },
    ],
    shipping_fee: 50,
    discount_applied: 0,
  });
}
