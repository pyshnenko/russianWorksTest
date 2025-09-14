import { LocationStatus } from '../../types/storeTypes';
import { AppStore } from '../../store/store';
import Geolocation from '@react-native-community/geolocation';
import { reqLocationPermission } from './permissions';

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
        AppStore.setLocationStatus(LocationStatus.NoPermission);
      else AppStore.setLocationStatus(LocationStatus.ErrorLocation);
    },
    {
      enableHighAccuracy: false, //задача - определять город. Высокая точность не нужна и замедлит работу
      timeout: 30000,
      maximumAge: 5 * 60 * 1000, //кэш позиции на 5 минут. Сомнительно что пользователь сможет быстрее покинуть город
    },
  );
};

export default getLocation;
