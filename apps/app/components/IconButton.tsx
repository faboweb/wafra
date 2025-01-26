import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, ImageSourcePropType } from "react-native";
import { Border, Color, Padding } from "@/GlobalStyles";

export type IconButtonType = {
  image?: ImageSourcePropType;
};

const IconButton = ({ image }: IconButtonType) => {
  return (
    <View style={styles.search01Wrapper}>
      <Image
        source={image}
        style={{
          width: 16,
          height: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  search01Icon: {},
  search01Wrapper: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorHoneydew,
    flexDirection: "row",
    alignItems: "center",
    padding: Padding.p_3xs,
  },
});

export default IconButton;
