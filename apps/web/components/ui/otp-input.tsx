import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, TextInput, Text } from 'react-native';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export interface OTPInputRef {
  focusNext: (index: number) => void;
  focusPrevious: (index: number) => void;
}

const OTPInput = forwardRef<OTPInputRef, OTPInputProps>(
  ({ length = 6, value, onChange, error }, ref) => {
    const inputRefs = useRef<Array<TextInput | null>>([]);
    const otpArray = value.split('').concat(Array(length).fill('')).slice(0, length);

    useImperativeHandle(ref, () => ({
      focusNext: (index: number) => {
        if (index < length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      },
      focusPrevious: (index: number) => {
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      },
    }));

    useEffect(() => {
      // Focus first input on mount
      inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (text: string, index: number) => {
      if (text.length > 1) {
        // Handle paste
        const pastedValue = text.slice(0, length);
        onChange(pastedValue);
        inputRefs.current[Math.min(pastedValue.length, length - 1)]?.focus();
        return;
      }

      const newValue = value.split('');
      newValue[index] = text;
      const newOTP = newValue.join('');
      onChange(newOTP);

      // Move to next input if value is entered
      if (text && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyPress = (e: any, index: number) => {
      // Handle backspace
      if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
        // If current input is empty and not first input, move to previous and delete
        const newValue = value.split('');
        newValue[index - 1] = '';
        onChange(newValue.join(''));
        inputRefs.current[index - 1]?.focus();
      }
    };

    return (
      <View className="w-full">
        <View className="flex-row gap-3 w-full justify-center">
          {Array.from({ length }).map((_, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              className="h-16 flex items-center justify-center text-center text-xl text-black"
              style={{
                width: '14%',
                minWidth: 50,
                borderBottomWidth: 1,
                borderColor: error ? 'red' : otpArray[index] ? 'lightgray' : 'black',
              }}
              value={otpArray[index]}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>
        {error && <Text className="text-red-500 text-sm mt-2 text-center">{error}</Text>}
      </View>
    );
  }
);

export default OTPInput;
