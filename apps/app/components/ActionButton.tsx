import { Image } from "@/components/CrossPlatformImage";
import { StyleSheet, View, Text, ImageSourcePropType } from "react-native";
import {
  Border,
  Color,
  Padding,
  FontSize,
  FontFamily,
  Gap,
} from "@/GlobalStyles";

export type ActionButtonType = {
  image?: ImageSourcePropType;
  caption?: string;
  disabled?: boolean;
};

const ActionButton = ({ image, caption, disabled }: ActionButtonType) => {
  return (
    <View
      style={[
        styles.frameParent,
        {
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      <View style={[styles.moneyReceiveCircleWrapper]}>
        <Image
          source={image}
          style={{
            width: 16,
            height: 16,
          }}
        />
      </View>
      <Text style={[styles.deposit]}>{caption}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  moneyReceiveCircleIcon: {},
  moneyReceiveCircleWrapper: {
    borderRadius: Border.br_xs,
    backgroundColor: Color.colorWhitesmoke,
    width: 48,
    flexDirection: "row",
    padding: Padding.p_base,
    alignItems: "center",
  },
  deposit: {
    alignSelf: "stretch",
    fontSize: FontSize.caption_size,
    fontFamily: FontFamily.textMdL24Regular,
    color: Color.taglineColor,
    textAlign: "center",
  },
  frameParent: {
    width: 56,
    gap: Gap.gap_4xs,
    alignItems: "center",
  },
});

export default ActionButton;
