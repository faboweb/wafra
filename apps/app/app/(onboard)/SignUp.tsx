import * as React from "react";
import { Image } from "@/components/CrossPlatformImage";
import { StyleSheet, Text, View } from "react-native";
import PhoneForm from "@/components/PhoneForm";
import Btn from "@/components/Btn";
import {
  FontSize,
  FontFamily,
  Color,
  Gap,
  Padding,
  Border,
} from "../../GlobalStyles";
import { useRouter } from "@/hooks/useRouter";
import { preAuthenticate } from "thirdweb/wallets";
import { client } from "@/constants/thirdweb";

const SignUp = () => {
  const router = useRouter();
  const [phone, setPhone] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [error, setError] = React.useState("");

  const signUp = async () => {
    if (!phone) {
      setError("Please enter a valid phone number and country code");
      return;
    }
    try {
      console.log("Sending code to", phone);
      await preAuthenticate({
        client,
        strategy: "phone",
        phoneNumber: phone,
      });
      router.push("./PhoneVerification?phone=" + phone + "&country=" + country);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.signUp}>
      <View style={[styles.topsection, styles.heroFlexBox]}>
        <View style={[styles.hero, styles.heroSpaceBlock]}>
          <Image
            source={require("@/assets/ornament.svg")}
            style={[
              styles.ornamentIcon,
              {
                width: 462,
                height: 152,
              },
            ]}
          />
          <Text style={styles.openYourAccount}>Open Your Account</Text>
        </View>
        <PhoneForm
          onChange={(country, phoneNumber) => {
            setCountry(country);
            setPhone(phoneNumber);
          }}
        />
        {error && <Text style={{ color: "red" }}>{error}</Text>}
      </View>
      <View style={[styles.buttongroup, styles.heroSpaceBlock]}>
        <Btn caption="Continue" onButtonPress={signUp} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroFlexBox: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  heroSpaceBlock: {
    paddingVertical: 0,
    overflow: "hidden",
  },
  ornamentIcon: {
    top: 7,
    left: -55,
    position: "absolute",
    zIndex: 0,
  },
  openYourAccount: {
    fontSize: FontSize.size_21xl,
    lineHeight: 56,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorGray_100,
    textAlign: "center",
    zIndex: 1,
    flex: 1,
  },
  hero: {
    height: 241,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 50,
    alignSelf: "stretch",
    alignItems: "center",
  },
  topsection: {
    gap: Gap.gap_2xl,
    zIndex: 0,
  },
  buttongroupChild: {
    backgroundColor: Color.colorGainsboro,
    width: 100,
    height: 24,
  },
  buttongroup: {
    bottom: 0,
    left: 0,
    width: "100%",
    paddingHorizontal: Padding.p_5xl,
    zIndex: 1,
    position: "absolute",
  },
  signUp: {
    backgroundColor: Color.colorLightgoldenrodyellow,
    width: "100%",
    paddingHorizontal: 0,
    paddingVertical: Padding.p_5xl,
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
  },
});

export default SignUp;
