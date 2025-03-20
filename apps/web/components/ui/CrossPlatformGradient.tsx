import * as React from 'react';
import { Platform, View, ViewStyle } from 'react-native';

// Only import LinearGradient for non-web platforms
const LinearGradientComponent =
  Platform.OS !== 'web'
    ? React.lazy(() =>
        import('expo-linear-gradient').then((m) => ({
          default: m.LinearGradient,
        }))
      )
    : null;

type Props = {
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: ViewStyle;
  className?: string;
};

function getWebGradientDirection(
  start?: { x: number; y: number },
  end?: { x: number; y: number }
): string {
  if (!start || !end) return 'to bottom';

  // Convert start/end coordinates to CSS gradient direction
  if (start.x === 0 && start.y === 0) {
    if (end.x === 1 && end.y === 1) return 'to bottom right';
    if (end.x === 1 && end.y === 0) return 'to right';
    if (end.x === 0 && end.y === 1) return 'to bottom';
  }
  if (start.x === 0 && start.y === 1) {
    if (end.x === 1 && end.y === 0) return 'to top right';
    if (end.x === 1 && end.y === 1) return 'to right';
  }

  return 'to bottom'; // default direction
}

export function CrossPlatformGradient({ colors, start, end, style, className }: Props) {
  if (Platform.OS === 'web') {
    const direction = getWebGradientDirection(start, end);
    const webStyle = {
      ...style,
      background: `linear-gradient(${direction}, ${colors.join(', ')})`,
    };

    return <div style={webStyle} className={className} />;
  }

  return (
    <React.Suspense fallback={<View style={style} className={className} />}>
      {LinearGradientComponent && (
        <LinearGradientComponent
          colors={colors}
          start={start}
          end={end}
          style={style}
          className={className}
        />
      )}
    </React.Suspense>
  );
}

export function LinearGradient({
  style,
  className,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string;
}) {
  return (
    <CrossPlatformGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        flex: 1,
        padding: 15,
        ...style,
      }}
      className={className}
    />
  );
}
