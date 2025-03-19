import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy load web components
// const Onboard = lazy(() => import("./(onboard)"));
// const Dashboard = lazy(() => import("./(dashboard)"));
// const Checkout = lazy(() => import("./(checkout)"));
// const Withdraw = lazy(() => import("./(withdraw)"));
import Onboard from "./(onboard)";
import OnboardSignUp from "./(onboard)/SignUp";
import OnboardFingerprint from "./(onboard)/Fingerprint";
import OnboardPhoneVerification from "./(onboard)/PhoneVerification";
import Dashboard from "./(dashboard)";
import Checkout from "./(checkout)";
import CheckoutCheckout from "./(checkout)/Checkout";
import CheckoutDepositing from "./(checkout)/Depositing";
import CheckoutDepositSuccess from "./(checkout)/DepositSuccess";
import Withdraw from "./(withdraw)";
import WithdrawDepositSuccess from "./(withdraw)/WithdrawSuccess";
import WithdrawWithdraw from "./(withdraw)/Withdraw";
import { Providers } from "@/providers/providers";

export default function WebLayout() {
  return (
    <Providers>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Onboard />} />
          <Route path="/(dashboard)/*" element={<Dashboard />} />
          <Route path="/(checkout)/*" element={<Checkout />} />
          <Route
            path="/(checkout)/CheckoutCheckout"
            element={<CheckoutCheckout />}
          />
          <Route
            path="/(checkout)/CheckoutDepositing"
            element={<CheckoutDepositing />}
          />
          <Route
            path="/(checkout)/CheckoutDepositSuccess"
            element={<CheckoutDepositSuccess />}
          />
          <Route path="/(withdraw)/*" element={<Withdraw />} />
          <Route
            path="/(withdraw)/WithdrawDepositSuccess"
            element={<WithdrawDepositSuccess />}
          />
          <Route
            path="/(withdraw)/WithdrawWithdraw"
            element={<WithdrawWithdraw />}
          />
          <Route path="/(onboard)/*" element={<Onboard />} />
          <Route path="/(onboard)/SignUp" element={<OnboardSignUp />} />
          <Route
            path="/(onboard)/Fingerprint"
            element={<OnboardFingerprint />}
          />
          <Route
            path="/(onboard)/PhoneVerification"
            element={<OnboardPhoneVerification />}
          />
        </Routes>
      </Suspense>
    </Providers>
  );
}
