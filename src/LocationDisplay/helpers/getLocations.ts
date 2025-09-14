import { LocationStatus } from '../../types/storeTypes';
import { AppStore } from '../../store/store';
import Geolocation from '@react-native-community/geolocation';
import { reqLocationPermission } from './permissions';
import { Alert, Linking, Platform } from 'react-native';

export const openSystemLocationSettings = async () => {
  //Открываем настройки
  try {
    if (Platform.OS === 'android') {
      // Android: Открыть системные настройки геолокации
      Linking.openSettings();
    } else if (Platform.OS === 'ios') {
      // iOS: Открыть настройки приложения
      const appSettingsURL = 'app-settings:';
      if (await Linking.canOpenURL(appSettingsURL)) {
        await Linking.openURL(appSettingsURL);
      } else {
        // Альтернатива: Открыть общий раздел "Приложения"
        await Linking.openURL('prefs:root=General&path=About');
      }
    }
  } catch (error) {
    console.error('Не удалось открыть настройки:', error);
  }
};

/**
 *
 * функция проверяет наличие разрешений на доступ к местоположению
 */

const getLocation = async () => {
  AppStore.setLocationStatus(LocationStatus.AwaitData);
  const hasPermission = await reqLocationPermission();
  if (!hasPermission) {
    AppStore.setLocationStatus(LocationStatus.NoPermission);
    return;
  }

  Geolocation.getCurrentPosition(
    position => {
      //console.log('Позиция получена:', position);
      AppStore.setLocation(position.coords);
    },
    error => {
      console.log(error);
      if (error.code === 1)
        //нет доступа к геоданным
        AppStore.setLocationStatus(LocationStatus.NoPermission);
      else if (error.code === 2) {
        //определение местоположения отключено
        Alert.alert(
          'Геолокация выключена',
          'Вы можете включить её в настройках.',
          [
            {
              text: 'Открыть настройки',
              onPress: () => openSystemLocationSettings(),
            },
          ],
        );
        AppStore.setLocationStatus(LocationStatus.ErrorLocation);
      } else AppStore.setLocationStatus(LocationStatus.ErrorLocation);
    },
    {
      enableHighAccuracy: false, //задача - определять город. Высокая точность не нужна и замедлит работу
      timeout: 30000,
      maximumAge: 5 * 60 * 1000, //кэш позиции на 5 минут. Сомнительно что пользователь сможет быстрее покинуть город
    },
  );
};

export default getLocation;
