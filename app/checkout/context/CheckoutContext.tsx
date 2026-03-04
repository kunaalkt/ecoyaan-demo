"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CheckoutState, ShippingAddress, CartItem } from "@/types";

interface CheckoutContextType extends CheckoutState {
  setShippingAddress: (address: ShippingAddress) => void;
}

const CheckoutContext = createContext<CheckoutContextType | null>(null);

interface CheckoutProviderProps {
  children: ReactNode;
  initialCartItems?: CartItem[];
  shippingFee?: number;
  discount?: number;
}

export function CheckoutProvider({
  children,
  initialCartItems = [],
  shippingFee = 50,
  discount = 0,
}: CheckoutProviderProps) {
  const [state, setState] = useState<CheckoutState>({
    cartItems: initialCartItems,
    shippingFee,
    discount,
  });

  // Set shipping address
  const setShippingAddress = (address: ShippingAddress) => {
    setState((prev) => ({ ...prev, shippingAddress: address }));
  };

  return (
    <CheckoutContext.Provider value={{ ...state, setShippingAddress }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }
  return context;
};
