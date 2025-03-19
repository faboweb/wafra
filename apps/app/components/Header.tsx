import * as React from "react";
import { Image } from "@/components/CrossPlatformImage";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "./IconButton";
import { Gap } from "@/GlobalStyles";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { useAccount } from "@/hooks/useAccount";
const Header = () => {
  const { signOut } = useAccount();
  return (
    <View style={[styles.header, styles.headerFlexBox]}>
      <Image
        style={[styles.wafraConcept1b1Icon, styles.headerLayout]}
        contentFit="cover"
        source={require("@/assets/logo.svg")}
      />
      <View style={[styles.frameParent, styles.headerFlexBox]}>
        {/* <IconButton image={require("@/assets/search01.svg")} /> */}
        <Menu>
          <MenuTrigger>
            <IconButton image={require("@/assets/morehorizontal.svg")} />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => signOut()} text="Sign Out" />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  headerLayout: {
    overflow: "hidden",
    height: 36,
  },
  wafraConcept1b1Icon: {
    width: 126,
  },
  frameParent: {
    gap: Gap.gap_3xs,
  },
  header: {
    gap: Gap.gap_4xl,
    zIndex: 0,
    overflow: "hidden",
    height: 36,
  },
});

export default Header;
