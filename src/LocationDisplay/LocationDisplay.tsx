import React, { useEffect } from 'react';
import { Button, Text, Box, IconButton } from '@react-native-material/core';
import { observer } from 'mobx-react-lite';
import { AppStore } from '../store/store';
import { LocationStatus } from '../types/storeTypes';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';
import { openSettings } from 'react-native-permissions';
import getLocation from './helpers/getLocations';

export default observer(function LocationDisplay(): React.ReactNode {
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <Box>
      {(AppStore.locationStatus === LocationStatus.DataReady ||
        AppStore.locationStatus === LocationStatus.FullDataReady) && (
        <Box style={styled.bigBlock}>
          <Box style={styled.smollBlock}>
            <Text>Широта: {AppStore.lat}</Text>
            <Text>Долгота: {AppStore.lot}</Text>
          </Box>
          <IconButton
            icon={props => <Icon name="refresh" {...props} />}
            onPress={getLocation}
          />
        </Box>
      )}
      {AppStore.locationStatus === LocationStatus.NoPermission && (
        <Box style={styled.errorBlock}>
          <Text>Отсутствуют разрешения на доступ к геолокации.</Text>
          <Text>
            Пожалуйста, откройте настройки и дайте разрешения приложению
          </Text>
          <Button
            style={styled.errorButton}
            title="Настройки"
            onPress={() => openSettings()}
          />
          <Button
            style={styled.errorButton}
            title="Повторить"
            onPress={() => getLocation()}
          />
        </Box>
      )}
      {AppStore.locationStatus === LocationStatus.ErrorLocation && (
        <Box style={styled.errorBlock}>
          <Text variant="h5">Геолокация отключена</Text>
          <Text>Включите геолокацию</Text>
          <Button
            title="Попробовать снова"
            onPress={getLocation}
            style={styled.errorButton}
          />
        </Box>
      )}
      {AppStore.locationStatus === LocationStatus.ErrorData && (
        <Box style={styled.errorBlock}>
          <Text variant="h5">Проблемы с соединением</Text>
          <Text>Проверьте интернет-соединение</Text>
          <Text>или попробуйте позже</Text>
          <Button
            title="Попробовать снова"
            onPress={getLocation}
            style={styled.errorButton}
          />
        </Box>
      )}
    </Box>
  );
});

const styled = StyleSheet.create({
  smollBlock: {
    flexDirection: 'column',
  },
  bigBlock: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  errorBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: 20,
    textAlign: 'center',
  },
  errorButton: { padding: 12 },
});
