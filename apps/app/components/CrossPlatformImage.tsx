import * as React from "react";
import { Platform, StyleProp, ImageStyle } from "react-native";

const ExpoImage =
  Platform.OS !== "web"
    ? React.lazy(() => import("expo-image").then((m) => ({ default: m.Image })))
    : () => {
        return null;
      };

type Props = {
  source: any;
  style?: StyleProp<ImageStyle>;
  contentFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  width?: number;
  height?: number;
};

// Manual style flattening function
const flattenStyle = (style?: Props["style"]): Record<string, any> => {
  if (!style) return {};
  if (Array.isArray(style)) {
    return style.reduce((acc, curr) => ({ ...acc, ...flattenStyle(curr) }), {});
  }
  return typeof style === "object" ? style : {};
};

export function Image({ source, style, contentFit }: Props) {
  if (Platform.OS === "web") {
    // Flatten and convert React Native styles to web-compatible styles
    const webStyle = flattenStyle(style) || {};
    const normalizedStyle = {
      ...webStyle,
      objectFit: contentFit, // Map contentFit to CSS object-fit
    };
    const extendedPath = source
      .replace("@/assets", "/assets")
      .replace("@assets", "/assets");
    return <img src={extendedPath} style={normalizedStyle} alt="" />;
  }

  return <ExpoImage source={source} style={style} contentFit={contentFit} />;
}
