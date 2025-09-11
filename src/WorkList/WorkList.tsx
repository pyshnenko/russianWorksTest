import React from 'react';
import type { ApiReqObjectType } from '../types/api';
import axios from 'axios';
import { Box, Text } from '@react-native-material/core';
import { FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { observer } from 'mobx-react-lite';
import { AppStore } from '../store/store';
import { SwipeListView } from 'react-native-swipe-list-view';
import SmallCard from './components/SmallCard';

export default observer(function WorkList(): React.ReactNode {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Box style={{ flex: 1 }}>
                <SwipeListView
                    data={AppStore.workBase.slice(0,25)}
                    renderItem={({ item }) => (
                        <SmallCard 
                            logo={item.logo}
                            companyName={item.companyName || 'Неизвестная компания'} 
                        />
                    )}
                    leftOpenValue={75}
                    rightOpenValue={-150}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onRowDidOpen={rowKey => {
                        console.log('This row opened', rowKey);
                    }}
                    // Увеличьте высоту строк, если нужно
                    ItemSeparatorComponent={() => <Box style={{ height: 10 }} />}
                />
                <Box style={{height: 50}}>
                    <Text>{'Кнопки'}</Text>
                </Box>
            </Box>
        </SafeAreaView>
    )
})
