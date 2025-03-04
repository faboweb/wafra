import { Text, StyleSheet, View, Pressable } from "react-native";
import ActionButton from "./ActionButton";
import BalanceCard from "./BalanceCard";
import { FontSize, FontFamily, Color, Gap } from "@/GlobalStyles";
import { useRouter } from "expo-router";
import { useBalances } from "@/hooks/useBalances";
import { useYield } from "@/hooks/useYield";
import { useCurrency } from "@/hooks/useCurrency";

const Overview = () => {
  const router = useRouter();
  const { data: balances, refetch: refetchBalances } = useBalances();
  const { balance, availableBalance, effectiveYield } = balances || {
    balance: BigInt(0),
    availableBalance: BigInt(0),
    effectiveYield: BigInt(0),
  };
  const { data: _yield } = useYield();
  const { formatCurrency } = useCurrency();
  console.log("balances", balances);

  return (
    <View style={[styles.overview, styles.frameFlexBox]}>
      <View style={[styles.frame, styles.frameFlexBox]}>
        <View style={styles.balance}>
          {/* <Text style={[styles.totalEarned, styles.e2011699FlexBox]}>
            Total Earned
          </Text> */}
          <Text
            style={[styles.e2011699, styles.e2011699FlexBox]}
            onPress={() => refetchBalances()}
          >
            {formatCurrency(balance)}
          </Text>
          <Text
            style={{
              fontSize: FontSize.size_sm,
              fontWeight: "500",
              fontFamily: FontFamily.interMedium,
              color: Color.primaryColor,
              lineHeight: 16,
            }}
          >
            + {formatCurrency(effectiveYield)}
          </Text>
        </View>
        <View style={[styles.actions, styles.actionsFlexBox]}>
          <Pressable onPress={() => router.push("/(checkout)")}>
            <ActionButton
              image={require("@/assets/moneyreceivecircle.svg")}
              caption="Deposit"
            />
          </Pressable>
          <ActionButton
            image={require("@/assets/sent.svg")}
            caption="Send"
            disabled
          />
          <ActionButton
            image={require("@/assets/reversewithdrawal01.svg")}
            caption="Withdraw"
            disabled
          />
        </View>
      </View>
      <View style={[styles.balancegroups, styles.actionsFlexBox]}>
        <BalanceCard
          balanceGroup="Wallet"
          balance={availableBalance}
          apr={_yield}
        />
        <BalanceCard balanceGroup="Earn" balance={0} apr={0.44} disabled />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameFlexBox: {
    justifyContent: "center",
    overflow: "hidden",
    alignItems: "center",
  },
  e2011699FlexBox: {
    textAlign: "center",
    alignSelf: "stretch",
  },
  actionsFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalEarned: {
    fontSize: FontSize.size_sm,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.taglineColor,
  },
  e2011699: {
    fontSize: FontSize.size_13xl,
    lineHeight: 32,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.dardColor,
  },
  balance: {
    width: 208,
    gap: Gap.gap_xs,
    alignItems: "center",
    paddingTop: 16,
  },
  actions: {
    gap: Gap.gap_3xl,
  },
  frame: {
    width: 256,
    gap: Gap.gap_xl,
  },
  balancegroups: {
    width: 343,
    gap: Gap.gap_2xs,
  },
  overview: {
    gap: Gap.gap_lg,
    zIndex: 1,
  },
});

export default Overview;
