import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";

import {
  Color,
  FontSize,
  FontFamily,
  Border,
  Gap,
  Padding,
} from "@/GlobalStyles";

export type BalanceCardType = {
  balanceGroup: string;
  balance: string;
  apr?: number;
  disabled?: boolean;
};

const BalanceCard = ({
  balanceGroup,
  apr,
  balance,
  disabled,
}: BalanceCardType) => {
  return (
    <View
      style={[
        styles.frameParent,
        {
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      <View style={styles.walletParent}>
        <Text style={[styles.wallet, styles.walletClr]}>{balanceGroup}</Text>
        <Image
          source={require("@/assets/frame-36.svg")}
          style={[
            styles.frameChild,
            {
              width: 24,
              height: 24,
            },
          ]}
        />
      </View>
      <View style={styles.e162756Parent}>
        <Text style={[styles.e162756, styles.walletClr]}>{balance}</Text>
        {apr && (
          <Text style={styles.avgApy}>
            {Math.round(apr * 10000) / 100}% Avg. APR
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  walletClr: {
    color: Color.dardColor,
    textAlign: "left",
  },
  wallet: {
    fontSize: FontSize.caption_size,
    textAlign: "left",
    fontFamily: FontFamily.textMdL24Regular,
    flex: 1,
  },
  frameChild: {
    borderRadius: Border.br_21xl,
  },
  walletParent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  e162756: {
    fontSize: FontSize.size_xl,
    lineHeight: 32,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    textAlign: "left",
    alignSelf: "stretch",
  },
  avgApy: {
    fontSize: FontSize.size_2xs,
    color: Color.primaryColor,
    textAlign: "left",
    fontFamily: FontFamily.textMdL24Regular,
    alignSelf: "stretch",
  },
  e162756Parent: {
    gap: Gap.gap_5xs,
    alignSelf: "stretch",
  },
  frameParent: {
    borderRadius: Border.br_xs,
    backgroundColor: Color.colorWhitesmoke,
    padding: Padding.p_xs,
    gap: Gap.gap_sm,
    flex: 1,
  },
});

export default BalanceCard;
