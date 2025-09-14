import React from 'react';
import LottieView from 'lottie-react-native';
import { Box } from '@react-native-material/core';
import { observer } from 'mobx-react-lite';
import { AppStore } from '../store/store';
import { LocationStatus } from '../types/storeTypes';
import { useTheme } from '@react-native-material/core';
import { Text } from '@react-native-material/core';
import { StyleSheet } from 'react-native';

export default observer(function Loading(): React.ReactNode {
  const theme = useTheme();

  // Проверяем стейт перед рендером
  if (
    AppStore.locationStatus < LocationStatus.AwaitData ||
    AppStore.locationStatus >= LocationStatus.FullDataReady
  ) {
    return null; // Не рендерим, если стейт не в нужном диапазоне
  }

  return (
    <Box
      style={[style.box, { backgroundColor: theme.palette.background.main }]}
    >
      <LottieView
        source={require('../../assets/loading.json')}
        autoPlay
        loop
        style={[
          { backgroundColor: theme.palette.background.main },
          style.lottie,
        ]}
      />
      <Text>{AppStore.locationMessage}</Text>
    </Box>
  );
});

const style = StyleSheet.create({
  box: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
  },
  lottie: {
    width: 200,
    height: 200,
  },
});
