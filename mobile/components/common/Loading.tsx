import React from 'react';
import { View } from 'react-native';

export default function Loading() {
  return (
    <View className="flex flex-col items-center justify-center w-full h-full">
      <View className="loader"></View>
    </View>
  );
}
