import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

/**
 * компонент для плавной анимации появления/скрытия
 * @isVisible - видимость
 */

const AnimatedModal = ({ children, isVisible }: { children: React.ReactNode, isVisible: boolean }) => {
  const modalAnimatedValue = useSharedValue(0); // Начальное значение — скрыто

  const startAnimation = (target: number) => {
    modalAnimatedValue.value = withTiming(target, { duration: 1000, easing: Easing.ease });
  };

  useEffect(() => {
    if (isVisible) {
        startAnimation(1);
    } else {
        startAnimation(0);
    }
  }, [isVisible]);

  const modalStyle = useAnimatedStyle(() => ({
    opacity: modalAnimatedValue.value,
    pointerEvents: modalAnimatedValue.value > 0 ? 'auto' : 'none', //прозрачность для касаний
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
