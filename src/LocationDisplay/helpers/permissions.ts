import { PermissionsAndroid, Platform } from 'react-native';

/**
 * Функция для запроса разрешения на доступ к местоположению
 * @returns {boolean} результат проверки/запроса разрешения
 */

export const reqLocationPermission = async () => {
    if (Platform.OS === 'android') {
    try {
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            title: 'Разрешение на доступ к местоположению',
            message: 'Приложение нуждается в доступе к вашему местоположению',
            buttonNeutral: 'Спросить позже',
            buttonNegative: 'Отмена',
            buttonPositive: 'ОК',
        },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('GRANTED');
        return true;
        } else {
        console.log('nop');
        return false;
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
    }
    return true; // Для iOS, так как разрешение запрашивается через Info.plist
};