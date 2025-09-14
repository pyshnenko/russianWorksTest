import { StyleSheet } from 'react-native';

export const fullCardStyle = StyleSheet.create({
  fullCardStyle: {
    position: 'absolute', // Абсолютное позиционирование
    top: -50,
    left: 0,
    right: 0,
    bottom: 0, // Заполняет весь экран
    zIndex: 100000, // Выше всех элементов
    padding: 20,
  },
  vacantBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    width: '100%',
  },
  compNameBox: {
    padding: 10,
    flex: 1,
  },
  textWrap: {
    flexWrap: 'wrap',
    maxWidth: '100%',
  },
  imgBox: {
    paddingTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
  },
  raitingBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  iconButtonStyle: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
});

export const SmallCardStyle = StyleSheet.create({
  box: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 8,
    paddingLeft: 12,
  },
  vacantionBox: {
    flexDirection: 'column',
    maxWidth: '80%',
  },
});
