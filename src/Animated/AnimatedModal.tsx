import React, { useEffect, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

/**
 * Компонент для плавной анимации появления/скрытия
 * @param children - дочерние элементы
 * @param isVisible - флаг видимости
 */
const AnimatedModal = ({
  children,
  isVisible,
}: {
  children: React.ReactNode;
  isVisible: boolean;
}) => {
  const modalAnimatedValue = useSharedValue(0); // Начальное значение — скрыто

  const startAnimation = useCallback(
    (target: number) => {
      // оборачиваем запуск анимации в коллбек
      modalAnimatedValue.value = withTiming(target, {
        duration: 200,
        easing: Easing.ease,
      });
    },
    [modalAnimatedValue],
  );

  useEffect(() => {
    if (isVisible) {
      startAnimation(1);
    } else {
      startAnimation(0);
    }
  }, [isVisible, startAnimation]);

  const modalStyle = useAnimatedStyle(() => ({
    opacity: modalAnimatedValue.value,
    pointerEvents: modalAnimatedValue.value > 0 ? 'auto' : 'none', // Прозрачность для касаний
  }));

  return (
    <Animated.View style={[styles.container, modalStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 9999,
  },
});

export default AnimatedModal;
