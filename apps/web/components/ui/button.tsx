import * as React from 'react';
import { Pressable, type PressableProps } from 'react-native';
import { cn } from '~/lib/utils';

type ButtonProps = PressableProps & {
  variant?: 'default' | 'ghost' | 'icon';
  size?: 'default' | 'sm' | 'lg';
};

const Button = React.forwardRef<Pressable, ButtonProps>(
  ({ variant = 'default', size = 'default', children, onPress, className = '' }, ref) => {
    const baseStyles = 'flex-row items-center justify-center rounded-[10px]';
    const variantStyles = {
      default: 'bg-wafra-green-light',
      ghost: 'bg-transparent',
      icon: 'bg-wafra-green-light p-2.5',
    };

    const sizeStyles = {
      default: 'px-4 py-2',
      sm: 'px-3 py-1.5',
      lg: 'px-6 py-3',
    };

    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
        {children}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

export { Button };
