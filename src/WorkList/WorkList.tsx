import React, { useState, useCallback } from 'react';
import { Box, useTheme } from '@react-native-material/core';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { AppStore } from '../store/store';
import { SwipeListView } from 'react-native-swipe-list-view';
import SmallCard from './components/SmallCard';
import FullCard from './components/FullCard';

export default observer(function WorkList(): React.ReactNode {
  const [rowsCount, setRowsCount] = useState(25);
  const [openCardIndex, setOpenCardIndex] = useState<number>(-1);
  const theme = useTheme(); // Получаем тему

  const handleEndReached = () => {
    if (rowsCount < AppStore.workBase.length) {
      setRowsCount(prevCount => prevCount + 25);
    }
  };
  const handlePress = useCallback((index: number) => {
    //для уменьшения ререндеринга компонента SmallCard
    setOpenCardIndex(index);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {openCardIndex > -1 && (
        <FullCard
          setOpenCardIndex={setOpenCardIndex}
          cardData={AppStore.workBase[openCardIndex]}
        />
      )}

      <Box
        style={[
          styles.listContainer,
          { backgroundColor: theme.palette.background.main }, // Цвет фона из темы
        ]}
      >
        <SwipeListView
          data={AppStore.workBase.slice(0, rowsCount)} //рендерим постепенно, по 25 элементов за раз
          renderItem={({ item, index }) => (
            <TouchableOpacity key={item.id} onPress={() => handlePress(index)}>
              <SmallCard {...item} />
            </TouchableOpacity>
          )}
          leftOpenValue={75}
          rightOpenValue={-150}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={0}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          ItemSeparatorComponent={() => <Box style={{ height: 10 }} />}
        />
      </Box>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    paddingBottom: Platform.select({ ios: 20, android: 30 }),
    paddingHorizontal: 4,
  },
});
