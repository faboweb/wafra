import {
  StyleSheet,
  Image,
  ActivityIndicator,
  View,
  Button,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemedText } from "@/components/ThemedText";

import { NavigationProp } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";

interface FaceIDScreenProps {}

export default function FaceIDScreen({}: FaceIDScreenProps) {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone?: string }>();

  const enableFaceId = async () => {
    console.log("getting data");
    const faceIdResult = await LocalAuthentication.authenticateAsync();
    if (faceIdResult.success) {
      try {
        // check if user is registered locally
        const result = await SecureStore.getItemAsync("account", {
          requireAuthentication: true,
        });
        if (result) {
          console.log("already registered");
          router.push("../dashboard");
          return;
        }
        console.log("registering");
        let account = JSON.stringify({ phone });
        AsyncStorage.setItem("account", account);
        router.push("../dashboard");
      } catch (err) {
        console.log("failed", err);
      }
    }
  };
  return (
    <View style={{ gap: 2, padding: 16 }}>
      <ThemedText type="title">Enable FaceID</ThemedText>
      <Button onPress={() => enableFaceId()} title="Enable FaceID" />
    </View>
  );
}
