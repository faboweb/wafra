import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "@/components/CrossPlatformImage";
import Explainer from "@/components/Explainer";
import Btn from "@/components/Btn";
import { FontSize, FontFamily, Color, Border, Padding } from "@/GlobalStyles";
import { useRouter } from "@/hooks/useRouter";

const Fingerprint = () => {
  const router = useRouter();

  return (
    <View style={styles.fingerprint}>
      <View style={[styles.hero, styles.heroLayout]}>
        <View style={[styles.frame, styles.heroLayout]}>
          <Text style={[styles.enableFingerprint, styles.scanning67FlexBox]}>
            Enable Fingerprint
          </Text>
          <View style={styles.fingerprint1}>
            <View style={[styles.frame1, styles.framePosition]}>
              <Text style={[styles.scanning67, styles.scanning67FlexBox]}>
                <Text style={styles.scanning}>{`Scanning `}</Text>
                <Text style={styles.text}>(67%)</Text>
              </Text>
            </View>
            <Image
              style={[styles.frameIcon, styles.framePosition]}
              contentFit="cover"
              source={"@/assets/frame1.png"}
            />
          </View>
        </View>
      </View>
      <Explainer />
      <View style={[styles.buttongroup, styles.buttongroupPosition]}>
        <Btn
          icon={false}
          size="Large"
          getStarted="Skip"
          buttonAlignSelf="stretch"
          buttonPosition="absolute"
          buttonTop={-9}
          buttonLeft={1}
          buttonWidth="unset"
          buttonHeight="unset"
          buttonBackgroundColor="rgba(27, 23, 37, 0)"
          getStartedColor="#1b1725"
          onButtonPress={() => router.push("/(dashboard)")}
        />
        <Btn
          icon={false}
          size="Large"
          getStarted="Next"
          buttonAlignSelf="stretch"
          buttonPosition="absolute"
          buttonTop={65}
          buttonLeft={0}
          buttonWidth="unset"
          buttonHeight="unset"
          buttonBackgroundColor="#1b1725"
          getStartedColor="#fff"
          onButtonPress={() => router.push("/(dashboard)")}
        />
        <View style={[styles.buttongroupChild, styles.buttongroupPosition]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroLayout: {
    height: 314,
    width: 173,
    alignItems: "center",
    overflow: "hidden",
  },
  scanning67FlexBox: {
    textAlign: "center",
    letterSpacing: 0.4,
  },
  framePosition: {
    position: "absolute",
    overflow: "hidden",
  },
  buttongroupPosition: {
    zIndex: 2,
    position: "absolute",
  },
  enableFingerprint: {
    fontSize: FontSize.size_lg,
    lineHeight: 25,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorGray_100,
  },
  scanning: {
    fontFamily: FontFamily.dMSansRegular,
  },
  text: {
    fontWeight: "700",
    fontFamily: FontFamily.dMSansBold,
  },
  scanning67: {
    fontSize: FontSize.size_sm,
    lineHeight: 22,
    color: Color.colorBlack,
  },
  frame1: {
    marginTop: 95.5,
    marginLeft: -172,
    top: "50%",
    left: "50%",
    width: 344,
    alignItems: "center",
  },
  frameIcon: {
    top: 0,
    left: 0,
    height: 181,
    width: 136,
  },
  fingerprint1: {
    height: 235,
    width: 136,
  },
  frame: {
    justifyContent: "center",
    gap: 54,
  },
  hero: {
    zIndex: 0,
  },
  buttongroupChild: {
    alignSelf: "stretch",
    top: 130,
    left: 114,
    backgroundColor: Color.colorGainsboro,
    height: 24,
  },
  buttongroup: {
    bottom: 0,
    left: 24,
    width: 328,
    height: 152,
    paddingHorizontal: 147,
    paddingVertical: 0,
    gap: 10,
    alignItems: "center",
  },
  fingerprint: {
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorLightgoldenrodyellow,
    flex: 1,
    width: "100%",
    height: 812,
    padding: Padding.p_5xl,
    gap: 93,
    alignItems: "center",
    overflow: "hidden",
  },
});

export default Fingerprint;
