import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Btn from "@/components/Btn";
import {
  Color,
  FontSize,
  FontFamily,
  Gap,
  Border,
  Padding,
} from "../../GlobalStyles";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { useQuery } from "@tanstack/react-query";
import { Linking } from "react-native";

interface DepositStatus {
  status: "pending" | "processing" | "completed" | "failed";
  value: string;
  transferTxHash?: string;
  depositTxHash?: string;
  error?: string;
}

const Depositing = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const [shouldPoll, setShouldPoll] = useState(true);

  const { data: depositStatus, error } = useQuery<DepositStatus>({
    queryKey: ["deposit-status", orderId],
    queryFn: async () => {
      const response = await fetch(`/api/deposits/${orderId}/status`);
      if (!response.ok) throw new Error("Failed to fetch deposit status");
      return response.json();
    },
    refetchInterval: shouldPoll ? 3000 : false, // Poll every 3 seconds while shouldPoll is true
    enabled: !!orderId,
  });

  useEffect(() => {
    if (
      depositStatus?.status === "completed" ||
      depositStatus?.status === "failed"
    ) {
      setShouldPoll(false);
    }
  }, [depositStatus?.status]);

  if (error) {
    return (
      <View style={styles.sendMoneyTopupSuccess}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
        <Btn
          caption="Try Again"
          onButtonPress={() => router.push("/(dashboard)")}
        />
      </View>
    );
  }

  if (depositStatus?.status === "failed") {
    return (
      <View style={styles.sendMoneyTopupSuccess}>
        <Text style={styles.errorText}>
          Deposit failed: {depositStatus.error || "Unknown error"}
        </Text>
        <Btn
          caption="Back to Dashboard"
          onButtonPress={() => router.push("/(dashboard)")}
        />
      </View>
    );
  }

  if (depositStatus?.status === "completed") {
    return (
      <View
        style={[styles.sendMoneyTopupSuccess, styles.successsectionFlexBox]}
      >
        <View>
          <Image
            source={require("@/assets/ornament1.svg")}
            style={[styles.ornamentIcon, { width: 462, height: 152 }]}
          />
          <View style={[styles.successsection, styles.successsectionFlexBox]}>
            <Text style={[styles.youHaveSuccessfullyContainer]}>
              <Text style={styles.youHaveSuccessfully}>
                You have successfully deposited{" "}
              </Text>
              <Text style={styles.text}>
                ${Number(depositStatus.value).toLocaleString()}
              </Text>
            </Text>
          </View>
          <View style={styles.buttongroup}>
            <Btn
              caption="Done"
              onButtonPress={() => router.push("/(dashboard)")}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </View>
    );
  }

  // Loading/Processing state
  return (
    <View style={[styles.sendMoneyTopupSuccess, styles.successsectionFlexBox]}>
      <View>
        <Image
          source={require("@/assets/ornament1.svg")}
          style={[styles.ornamentIcon, { width: 462, height: 152 }]}
        />
        <View style={[styles.successsection, styles.successsectionFlexBox]}>
          <Text style={[styles.youHaveSuccessfullyContainer]}>
            {depositStatus?.status === "processing"
              ? "Processing your deposit..."
              : "Initiating deposit..."}
          </Text>
          <ActivityIndicator size="large" color={Color.primary} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  successsectionFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  downloadReceipt1Typo: {
    textAlign: "center",
    color: Color.colorBlack,
    letterSpacing: 0.5,
    fontSize: FontSize.subtitle1_size,
  },
  ornamentIcon: {
    zIndex: 0,
  },
  youHaveSuccessfully: {
    fontFamily: FontFamily.textMdL24Regular,
  },
  text: {
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  youHaveSuccessfullyContainer: {
    lineHeight: 26,
    width: 326,
  },
  icons: {
    overflow: "hidden",
  },
  downloadReceipt1: {
    fontFamily: FontFamily.dMSansBold,
    fontWeight: "700",
  },
  downloadReceipt: {
    flexDirection: "row",
    gap: Gap.gap_3xs,
    alignItems: "center",
  },
  successsection: {
    gap: Gap.gap_sm,
    zIndex: 1,
  },
  buttongroup: {
    marginTop: "auto",
    flexDirection: "row",
  },
  sendMoneyTopupSuccess: {
    borderRadius: Border.br_13xl,
    backgroundColor: Color.widgetBackground,
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },
  errorText: {
    color: Color.error,
    fontSize: FontSize.subtitle1_size,
    fontFamily: FontFamily.interMedium,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default Depositing;
