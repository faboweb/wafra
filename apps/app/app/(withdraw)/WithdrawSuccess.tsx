import { StyleSheet, Text, View } from "react-native";
import Btn from "@/components/Btn";
import {
  Color,
  FontSize,
  FontFamily,
  Gap,
  Border,
  Padding,
} from "../../GlobalStyles";
import { useRouter } from "@/hooks/useRouter";
import { Image } from "@/components/CrossPlatformImage";

const SendMoneyTopupSuccess = () => {
  const router = useRouter();

  return (
    <View style={[styles.sendMoneyTopupSuccess, styles.successsectionFlexBox]}>
      <View>
        <Image
          source={require("@/assets/ornament1.svg")}
          style={[
            styles.ornamentIcon,
            {
              width: 462,
              height: 152,
            },
          ]}
        />
        <View style={[styles.successsection, styles.successsectionFlexBox]}>
          <Text
            style={[
              styles.youHaveSuccessfullyContainer,
              styles.downloadReceipt1Typo,
            ]}
          >
            <Text
              style={styles.youHaveSuccessfully}
            >{`You have successfully topped up `}</Text>
            <Text style={styles.text}>$15</Text>
          </Text>
          <View style={styles.downloadReceipt}>
            <Image
              source={require("@/assets/icons1.svg")}
              style={[
                styles.icons,
                {
                  width: 24,
                  height: 24,
                },
              ]}
            />
            <Text
              style={[styles.downloadReceipt1, styles.downloadReceipt1Typo]}
            >
              Download Receipt
            </Text>
          </View>
        </View>
        <View style={styles.buttongroup}>
          <Btn
            caption="Done"
            onButtonPress={() => router.push("/(dashboard)")}
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
});

export default SendMoneyTopupSuccess;
