import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { observer } from 'mobx-react-lite';
import { AppStore } from "../store/store";
import { LocationStatus } from "../types/storeTypes";

const AnimatedModal = observer(({ children }: { children: React.ReactNode }) => {
  const modalAnimatedValue = useSharedValue(0); // Начальное значение — скрыто
  const prevStatusRef = useRef(AppStore.locationStatus);

  const currentStatus = AppStore.locationStatus;

  const startAnimation = (target: number) => {
    modalAnimatedValue.value = withTiming(target, { duration: 1000, easing: Easing.ease });
  };

  useEffect(() => {
    if (prevStatusRef.current !== currentStatus) {
      console.log("LocationStatus changed:", currentStatus);

      if (currentStatus >= LocationStatus.AwaitData && 
          currentStatus < LocationStatus.FullDataReady) {
        startAnimation(1);
      } else {
        startAnimation(0);
      }

      prevStatusRef.current = currentStatus;
    }
  }, [currentStatus]);

  const modalStyle = useAnimatedStyle(() => ({
    opacity: modalAnimatedValue.value,
    //transform: [{ scale: modalAnimatedValue.value }],
    pointerEvents: modalAnimatedValue.value > 0 ? 'auto' : 'none', // Блокировка событий касаний
  }));

  return (
    <Animated.View style={[styles.container, modalStyle]}>
      {children}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999, // Увеличен zIndex для приоритета
  },
});

export default AnimatedModal;
