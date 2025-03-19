import { Platform } from "react-native";
import { Link as WebLink } from "react-router-dom";
import { Pressable, Text } from "react-native";
import { openBrowserAsync } from "expo-web-browser";

type Props = {
  href: string;
  children: React.ReactNode;
  style?: any;
};

export function ExternalLink({ href, children, style }: Props) {
  if (Platform.OS === "web") {
    return (
      <WebLink to={href} target="_blank" style={style}>
        {children}
      </WebLink>
    );
  }

  return (
    <Pressable
      style={style}
      onPress={async () => {
        await openBrowserAsync(href);
      }}
    >
      <Text>{children}</Text>
    </Pressable>
  );
}
