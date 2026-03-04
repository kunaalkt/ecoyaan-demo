"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch dummy products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products?limit=8");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 border-b border-gray-700">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          Ecoyaan
        </h1>
        <div className="flex gap-5">
          <button
            onClick={() => router.push("/checkout")}
            className="bg-green-600 px-4 py-2 rounded hover:opacity-80 hover:cursor-pointer transition"
          >
            Cart
          </button>
          <Image
            className="rounded-full hover:cursor-pointer hover:opacity-80 transition"
            height={40}
            width={40}
            unoptimized={true}
            alt="Avatar"
            src="https://placehold.co/600x600/white/red?text=U"
          />
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4">Shop Sustainable Products</h2>
        <p className="text-gray-300">
          Eco-friendly items delivered to your doorstep
        </p>
      </section>

      {/* Products Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        {loading ? (
          <p className="text-center text-gray-400">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-800 rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition relative"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={128}
                  height={128}
                  className="w-32 h-32 object-contain mb-4"
                />
                <h3
                  className="text-white font-semibold text-center mb-2 truncate w-full"
                  title={product.title}
                >
                  {product.title}
                </h3>
                <p className="text-green-500 font-bold mb-4">
                  ₹{Math.round(product.price)}
                </p>
                <button className="bg-black text-white px-4 py-2 rounded hover:opacity-80 hover:cursor-pointer transition w-full mt-auto">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
