import { Image } from "@/components/CrossPlatformImage";
import { StyleSheet, Text, View } from "react-native";
import { FontSize, FontFamily, Color, Gap } from "../GlobalStyles";

export type FooterButtonType = {
  image: string;
  caption: string;
  disabled?: boolean;
};

const FooterButton = ({ image, caption, disabled }: FooterButtonType) => {
  return (
    <View
      style={[
        styles.home04Parent,
        {
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      <Image
        source={image}
        style={{
          width: 24,
          height: 24,
        }}
      />
      <Text style={styles.caption}>{caption}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {},
  caption: {
    alignSelf: "stretch",
    fontSize: FontSize.size_2xs,
    fontFamily: FontFamily.textMdL24Regular,
    color: Color.dardColor,
    textAlign: "center",
  },
  home04Parent: {
    width: 77,
    alignItems: "center",
    gap: Gap.gap_5xs,
  },
});

export default FooterButton;
