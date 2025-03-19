import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy load all web components
const Onboard = lazy(() => import("./(onboard)"));
const OnboardSignUp = lazy(() => import("./(onboard)/SignUp"));
const OnboardFingerprint = lazy(() => import("./(onboard)/Fingerprint"));
const OnboardPhoneVerification = lazy(
  () => import("./(onboard)/PhoneVerification")
);
const Dashboard = lazy(() => import("./(dashboard)"));
const Checkout = lazy(() => import("./(checkout)"));
const CheckoutCheckout = lazy(() => import("./(checkout)/Checkout"));
const CheckoutDepositing = lazy(() => import("./(checkout)/Depositing"));
const CheckoutDepositSuccess = lazy(
  () => import("./(checkout)/DepositSuccess")
);
const Withdraw = lazy(() => import("./(withdraw)"));
const WithdrawDepositSuccess = lazy(
  () => import("./(withdraw)/WithdrawSuccess")
);
const WithdrawWithdraw = lazy(() => import("./(withdraw)/Withdraw"));

export default function WebRouter() {
  return (
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
        <Route path="/(onboard)/Fingerprint" element={<OnboardFingerprint />} />
        <Route
          path="/(onboard)/PhoneVerification"
          element={<OnboardPhoneVerification />}
        />
      </Routes>
    </Suspense>
  );
}
