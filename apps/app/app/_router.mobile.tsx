import * as React from "react";
import { Stack } from "expo-router";
import { Platform } from "react-native";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy load web components
const WebOnboard = lazy(() => import("@/app/(onboard)"));
const WebDashboard = lazy(() => import("@/app/(dashboard)"));
const WebCheckout = lazy(() => import("@/app/(checkout)"));
const WebWithdraw = lazy(() => import("@/app/(withdraw)"));

export default function LayoutInner() {
  if (Platform.OS === "web") {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<WebOnboard />} />
          <Route path="/dashboard/*" element={<WebDashboard />} />
          <Route path="/checkout/*" element={<WebCheckout />} />
          <Route path="/withdraw/*" element={<WebWithdraw />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(onboard)" options={{ headerShown: false }} />
      <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      <Stack.Screen name="(checkout)" options={{ headerShown: false }} />
      <Stack.Screen name="(withdraw)" options={{ headerShown: false }} />
    </Stack>
  );
}
