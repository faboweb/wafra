import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

interface ButtonProps {
  variant?: 'default' | 'ghost' | 'icon';
  size?: 'default' | 'sm' | 'lg';
  children?: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

const Button = React.forwardRef<View, ButtonProps>(
  ({ variant = 'default', size = 'default', children, onPress, className = '' }, ref) => {
    const baseStyles = 'flex-row items-center justify-center rounded-[10px]';
    const variantStyles = {
      default: 'bg-[#d5efd5]',
      ghost: 'bg-transparent',
      icon: 'bg-[#d5efd5] p-2.5',
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
