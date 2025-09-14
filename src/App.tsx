import React from 'react';
import LocationDisplay from './LocationDisplay/LocationDisplay';
import { Box } from '@react-native-material/core';
import { ThemeProvider } from '@react-native-material/core';
import WorkList from './WorkList/WorkList';
import LoadingController from './loading/LoadingController';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

interface PropsType {
  isDarkMode: boolean;
}

/**
 * Основной компонент приложения, который управляет темой (темный/светлый режим) и макетом.
 *
 * @param isDarkMode - Флаг, определяющий, включена ли темная тема
 */
export default function ({ isDarkMode }: PropsType) {
  const insets = useSafeAreaInsets();

  return (
    <ThemeProvider>
      <Box
        style={[
          style.baseContainer,
          isDarkMode ? style.darkContainer : style.lightContainer,
        ]}
      >
        {/* Компонент отображения состояния загрузки */}
        <LoadingController />
        {/* Обеспечивает безопасную область для контента (например, избегает наложения на системные панели) */}
        <SafeAreaProvider>
          <Box style={[style.safeArea, { paddingTop: insets.top }]}>
            {/* Компонент отображения информации о локации */}
            <LocationDisplay />
            {/* Компонент отображения вакансий */}
            <WorkList />
          </Box>
        </SafeAreaProvider>
      </Box>
    </ThemeProvider>
  );
}

const style = StyleSheet.create({
  baseContainer: {
    width: '100%',
    height: '100%',
  },
  lightContainer: {
    backgroundColor: '#FFFFFF',
  },
  darkContainer: {
    backgroundColor: '#000000',
  },
  safeArea: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
});
