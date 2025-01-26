import { Text, StyleSheet, Pressable, StyleProp, Button } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";
import { fontSize } from "thirdweb/dist/types/react/core/design-system";

export type BtnType = {
  caption: string;

  variant?: string;
  icon?: boolean;
  style?: StyleProp<any>;

  /** Action props */
  onButtonPress?: () => void;
};

const Btn = ({
  variant = "Primary",
  icon = false,
  caption,
  onButtonPress = () => {},
  style: passedStyle,
}: BtnType) => {
  const variants = {
    List: {
      backgroundColor: "#E1F0D7",
      padding: Padding.p_sm,
      borderRadius: 12,
      color: "#010E01",
      fontSize: FontSize.size_sm,
    },
  }[variant];
  return (
    <Pressable
      style={[styles.button, variants, passedStyle]}
      onPress={onButtonPress}
    >
      <Text
        style={[
          styles.getStarted,
          {
            color: variants?.color || styles.getStarted.color,
            fontSize: variants?.fontSize || styles.getStarted.fontSize,
          },
        ]}
      >
        {caption}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  getStarted: {
    fontSize: FontSize.size_lg,
    lineHeight: 25,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.widgetBackground,
    textAlign: "center",
  },
  button: {
    alignSelf: "stretch",
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorGray_100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: Padding.p_xl,
  },
});

export default Btn;
