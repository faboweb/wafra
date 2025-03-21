import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Trash2 } from 'lucide-react-native';

export type NumberKeyboardType = {
  showDribble?: boolean;
  onPress: (value: number) => void;
  onDelete?: () => void;
};

export const NumberKeyboard = ({ showDribble, onPress, onDelete }: NumberKeyboardType) => {
  return (
    <View className="w-full flex-row flex-wrap">
      {showDribble && <View className="absolute top-16 left-0 w-[633px] h-[291px]" />}
      <Text
        className="text-center text-wafra-gray font-medium text-2xl leading-[60px] tracking-[0.6px] w-1/3 h-16"
        onPress={() => onPress(1)}>
        1
      </Text>
      <Text
        className="text-center text-wafra-gray font-medium text-2xl leading-[60px] tracking-[0.6px] w-1/3 h-16"
        onPress={() => onPress(2)}>
        2
      </Text>
      <Text
        className="text-center text-wafra-gray font-medium text-2xl leading-[60px] tracking-[0.6px] w-1/3 h-16"
        onPress={() => onPress(3)}>
        3
      </Text>
      <Text
        className="text-center text-wafra-gray font-medium text-2xl leading-[60px] tracking-[0.6px] w-1/3 h-16"
        onPress={() => onPress(4)}>
        4
      </Text>
      <Text
        className="text-center text-wafra-gray font-medium text-2xl leading-[60px] tracking-[0.6px] w-1/3 h-16"
        onPress={() => onPress(5)}>
        5
      </Text>
      <Text
        className="text-center text-wafra-gray font-medium text-2xl leading-[60px] tracking-[0.6px] w-1/3 h-16"
        onPress={() => onPress(6)}>
        6
      </Text>
      <Text
        className="text-center text-wafra-gray font-medium text-2xl leading-[60px] tracking-[0.6px] w-1/3 h-16"
        onPress={() => onPress(7)}>
        7
      </Text>
      <Text
        className="text-center text-wafra-gray font-medium text-2xl leading-[60px] tracking-[0.6px] w-1/3 h-16"
        onPress={() => onPress(8)}>
        8
      </Text>
      <Text
        className="text-center text-wafra-gray font-medium text-2xl leading-[60px] tracking-[0.6px] w-1/3 h-16"
        onPress={() => onPress(9)}>
        9
      </Text>
      <Text className="text-center text-wafra-gray font-medium text-2xl leading-[60px] tracking-[0.6px] w-1/3 h-16 invisible">
        {' '}
      </Text>
      <Text
        className="text-center text-wafra-gray font-medium text-2xl leading-[60px] tracking-[0.6px] w-1/3 h-16"
        onPress={() => onPress(0)}>
        0
      </Text>
      <Pressable
        onPress={onDelete}
        className="text-center text-wafra-gray font-medium text-2xl leading-[60px] tracking-[0.6px] w-1/3 h-16 justify-center items-center">
        <Trash2 size={32} className="text-wafra-gray" />
      </Pressable>
    </View>
  );
};
