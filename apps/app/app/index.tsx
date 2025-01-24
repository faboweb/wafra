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

import { useRouter } from "expo-router";

interface FaceIDScreenProps {}

export default function FaceIDScreen({}: FaceIDScreenProps) {
  const router = useRouter();

  const enableFaceId = async () => {
    const faceIdResult = await LocalAuthentication.authenticateAsync();
    if (faceIdResult.success) {
      try {
        const result = await SecureStore.getItemAsync("account", {
          requireAuthentication: true,
        });
        await AsyncStorage.setItem("account", JSON.stringify(result));
        if (result) {
          router.push("../dashboard");
        } else {
          router.push("../(onboard)");
        }
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
