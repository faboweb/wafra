import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Hero from "@/components/Hero";
import UnderlineInput from "@/components/UnderlineInput";
import NumberKeyboard from "@/components/NumberKeyboard";
import Btn from "@/components/Btn";
import { Color, Border, Padding, Gap } from "../../GlobalStyles";
import { useRouter } from "expo-router";
import { useActiveAccount } from "thirdweb/react";
import {
  onRampSDKNativeEvent,
  startOnrampSDK,
} from "@onramp.money/onramp-react-native-sdk";
import IconButton from "@/components/IconButton";

const SendMoneyPeopleStep = () => {
  const [amount, setAmount] = React.useState(100);
  const router = useRouter();
  const account = useActiveAccount();

  const FUND_CONTRACT = account?.address;

  const deposit = () => {
    startOnrampSDK({
      appId: 1424661, // Replace this with the appID obtained during onboarding
      walletAddress: FUND_CONTRACT, // Replace with the user's wallet address
      flowType: 1, // 1 -> Onramp, 2 -> Offramp, 3 -> Merchant checkout
      // fiatType: 1, // 1 -> INR, 2 -> TRY (Turkish Lira) etc. visit Fiat Currencies page to view full list of supported fiat currencies
      // paymentMethod: 1, // 1 -> Instant transfer (UPI), 2 -> Bank transfer (IMPS/FAST)
      // ... Include other configuration options here
      addressTag: account?.address,
    });
  };

  React.useEffect(() => {
    console.log("account", account);
  }, [account]);

  React.useEffect(() => {
    const onRampEventListener = onRampSDKNativeEvent.addListener(
      "widgetEvents",
      async (eventData) => {
        if (
          [
            "ONRAMP_WIDGET_CLOSE_REQUEST",
            "ONRAMP_WIDGET_CLOSE_REQUEST_CONFIRMED",
          ].includes(eventData.type)
        ) {
          return;
        }
        console.log("Received onRampEvent:", eventData);
        // router.push("./DepositSuccess");
      }
    );

    return () => {
      onRampEventListener.remove();
    };
  }, []);

  return (
    <View style={styles.sendMoneyPeopleStep2}>
      <View
        style={{
          alignItems: "flex-start",
          flexDirection: "row",
          alignSelf: "stretch",
          marginLeft: 24,
        }}
      >
        <Pressable onPress={() => router.push("/(dashboard)")}>
          <IconButton image={require("@/assets/search01.svg")} />
        </Pressable>
      </View>
      <Hero />
      <UnderlineInput value={amount} />
      <View style={[styles.keyboard, styles.frameLayout]}>
        <View style={[styles.frame, styles.frameLayout]}>
          <NumberKeyboard
            showDribble={false}
            onPress={(val) => setAmount(amount * 10 + val)}
            onDelete={() => setAmount(Math.floor(amount / 10))}
          />
          <View style={styles.buttongroup}>
            <Btn caption="Deposit" onButtonPress={() => deposit()} />
            <View style={styles.buttongroupChild} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameLayout: {
    width: 375,
    alignItems: "center",
    overflow: "hidden",
  },
  buttongroupChild: {
    backgroundColor: Color.colorGainsboro,
    width: 100,
    height: 24,
  },
  buttongroup: {
    width: 327,
    height: 92,
    marginTop: -92,
    alignItems: "center",
  },
  frame: {
    height: 447,
    justifyContent: "flex-end",
  },
  keyboard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    zIndex: 2,
  },
  sendMoneyPeopleStep2: {
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorLightgoldenrodyellow,
    flex: 1,
    width: "100%",
    height: 812,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_5xl,
    gap: Gap.gap_sm,
    alignItems: "center",
    overflow: "hidden",
  },
});

export default SendMoneyPeopleStep;
