import { Button, StyleSheet, TextInput, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";

import { useState, useEffect } from "react";
import * as Localization from "expo-localization";

export default function WelcomeScreen({}) {
  const router = useRouter();

  return (
    <View style={{ gap: 2, padding: 16 }}>
      <ThemedText>You deposited XXX</ThemedText>

      <Button onPress={() => router.push("../dashboard")} title="Continue" />
    </View>
  );
}
