import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "@/components/CrossPlatformImage";
import FooterButton from "./FooterButton";
import { Gap, Color, Padding } from "@/GlobalStyles";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.frameParent}>
        <View style={styles.frameGroup}>
          <FooterButton image={"@/assets/home04.svg"} caption="Home" />
          <FooterButton
            image={"@/assets/tradeup.svg"}
            caption="Earn"
            disabled
          />
          <FooterButton
            image={"@/assets/creditcard.svg"}
            caption="Card"
            disabled
          />
          <FooterButton
            image={"@/assets/starfour.svg"}
            caption="Referrals"
            disabled
          />
        </View>
        <Image
          source={"@/assets/vector-1.svg"}
          style={[
            styles.frameChild,
            {
              width: 120,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameGroup: {
    flexDirection: "row",
    gap: Gap.gap_xs,
    alignItems: "center",
  },
  frameChild: {
    maxHeight: "100%",
  },
  frameParent: {
    backgroundColor: Color.colorWhitesmoke,
    width: "100%",
    height: 72,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_5xs,
    gap: Gap.gap_sm,
    alignItems: "center",
  },
  footer: {
    overflow: "hidden",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
});

export default Footer;
