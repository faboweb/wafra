import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy load web components
// const Onboard = lazy(() => import("./(onboard)"));
// const Dashboard = lazy(() => import("./(dashboard)"));
// const Checkout = lazy(() => import("./(checkout)"));
// const Withdraw = lazy(() => import("./(withdraw)"));
import Onboard from "./(onboard)";
import Dashboard from "./(dashboard)";
import Checkout from "./(checkout)";
import Withdraw from "./(withdraw)";
import { Providers } from "@/providers/providers";

export default function WebLayout() {
  return (
    <Providers>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Onboard />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/checkout/*" element={<Checkout />} />
          <Route path="/withdraw/*" element={<Withdraw />} />
        </Routes>
      </Suspense>
    </Providers>
  );
}
