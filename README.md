# Ecoyaan Checkout Flow (Demo)

A simplified e-commerce checkout flow built with **Next.js 16**, **React**, **TypeScript**, and **Tailwind CSS**.  
This project demonstrates a multi-step checkout experience with cart, shipping, payment, and success screens.

---

## **Features**

- Cart / Order Summary
- Shipping Address form with inline validation
- Payment simulation
- Success confirmation page
- Landing page with dummy products fetched from an external API
- Persistent cart state in memory using **React Context**
- Dark-themed UI

---

## **Architecture & Choices**

1. **Next.js App Router**
   - `app/checkout` contains all checkout-related pages (`page.tsx`) and components.
   - Using **Server Components** for initial data fetching where needed (e.g., `CheckoutPage` fetches cart mock data via SSR).
   - **Client Components** (`"use client"`) are used for interactive pages with state (shipping form, payment, landing page).

2. **State Management**
   - `CheckoutContext` (Context API) manages cart items, shipping address, shipping fee, and discount.
   - Simple in-memory state; `addToCart` updates the context for demo purposes.
   - Each page consumes the context via `useCheckout()` hook.

3. **Forms & Validation**
   - Shipping form validates inline as the user types.
   - Validation errors are displayed immediately, improving UX.

4. **Navigation & Route Guards**
   - Users cannot access `/checkout/payment` or `/checkout/success` directly without completing prior steps.
   - Uses `next/navigation`'s `useRouter()` to redirect if necessary.

5. **Styling**
   - Tailwind CSS for quick, responsive styling.
   - Dark theme applied globally for consistency.

6. **Data & API**
   - Mock backend via `/api/cart` returns initial cart items.
   - Landing page fetches dummy products from [FakeStoreAPI](https://fakestoreapi.com/) using client-side fetching.

---

## **Project Structure**

app/
├─ checkout/
│ ├─ context/CheckoutContext.tsx
│ ├─ components/StepIndicator.tsx
│ ├─ page.tsx // Cart / Checkout start
│ ├─ shipping/page.tsx
│ ├─ payment/page.tsx
│ ├─ success/page.tsx
├─ page.tsx
├─ layout.tsx
api/
├─ cart/route.ts
types/
├─ index.ts
globals.css

---

## **Running Locally**

1. Clone the repository:

```bash
git clone <repo-url>
cd <repo-folder>
```

2. Install Dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open `http://localhost:3000` in your browser
