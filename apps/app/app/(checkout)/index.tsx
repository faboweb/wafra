import * as React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import Hero from "@/components/Hero";
import UnderlineInput from "@/components/UnderlineInput";
import NumberKeyboard from "@/components/NumberKeyboard";
import Btn from "@/components/Btn";
import { Color, Border, Padding, Gap } from "../../GlobalStyles";
import { useRouter } from "expo-router";
import IconButton from "@/components/IconButton";
import { useAccount } from "@/hooks/useAccount";
import countries from "@/constants/countries";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { useInsetColor } from "@/hooks/useInsetColor";

const CheckoutStart = () => {
  const [amount, setAmount] = React.useState(100);
  const router = useRouter();
  const route = useRoute();
  const { account, depositAddress } = useAccount();
  const insets = useSafeAreaInsets();
  const country = countries.find((c) => c.value === account?.country);
  const params = route.params as {
    error: boolean;
  };
  const { setInsetColors } = useInsetColor();

  React.useEffect(() => {
    setInsetColors(
      Color.colorLightgoldenrodyellow,
      Color.colorLightgoldenrodyellow
    );
  }, []);

  const deposit = () => {
    if (!country) return;
    if (!depositAddress) return;

    const orderId = Math.random().toString(36).substring(2, 15);

    router.push(
      `/Checkout?orderId=${orderId}&amount=${amount}&currency=${country.currency}`
    );
  };

  return (
    <View style={styles.sendMoneyPeopleStep2}>
      <View
        style={{
          alignItems: "flex-start",
          flexDirection: "row",
          alignSelf: "stretch",
        }}
      >
        <Pressable onPress={() => router.back()}>
          <IconButton image={require("@/assets/arrow-left.svg")} />
        </Pressable>
      </View>
      <Hero />
      <UnderlineInput value={amount} prefix={country?.currency} />
      {params.error && (
        <Text style={{ color: "red" }}>Error: {params.error}</Text>
      )}
      <View
        style={[
          styles.frame,
          styles.frameLayout,
          {
            marginTop: 24,
          },
        ]}
      >
        <NumberKeyboard
          showDribble={false}
          onPress={(val) => setAmount(amount * 10 + val)}
          onDelete={() => setAmount(Math.floor(amount / 10))}
        />
        <View style={styles.buttongroup}>
          <Btn
            caption="Deposit"
            onButtonPress={() => deposit()}
            style={{
              flex: 1,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameLayout: {
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  buttongroup: {
    flexDirection: "row",
    marginTop: "auto",
    alignSelf: "stretch",
    justifyContent: "center",
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
    backgroundColor: Color.colorLightgoldenrodyellow,
    flex: 1,
    width: "100%",
    height: 812,
    paddingHorizontal: 24,
    paddingVertical: Padding.p_5xl,
    gap: Gap.gap_sm,
    alignItems: "center",
    overflow: "hidden",
  },
});

export default CheckoutStart;
