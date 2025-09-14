import React, { memo } from 'react';
import { View, StyleSheet, Platform, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@react-native-material/core';

interface PaperProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevation?: number; // Для Android
  shadowColor?: string; // Для iOS
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  borderRadius?: number;
}

const Paper: React.FC<PaperProps> = ({
  children,
  style,
  elevation = 3,
  shadowColor = 'rgba(0,0,0,0.2)',
  shadowOffset = { width: 0, height: 2 },
  shadowOpacity = 1,
  shadowRadius = 4,
  borderRadius = 8,
}) => {
  const theme = useTheme(); // Получаем текущую тему
  // Динамические стили на основе темы
  const paperStyle = StyleSheet.create({
    container: {
      backgroundColor: theme.colorScheme === 'dark' ? '#232323' : '#fafafa', // Цвет фона из темы
      borderRadius,
      ...Platform.select({
        android: {
          elevation,
        },
        ios: {
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
        },
      }),
    },
  });

  return <View style={[paperStyle.container, style]}>{children}</View>;
};

export default memo(Paper);
