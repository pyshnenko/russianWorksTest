import React, {useState} from 'react';
import type { ApiReqObjectType } from '../types/api';
import axios from 'axios';
import { Box, Text } from '@react-native-material/core';
import { FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { observer } from 'mobx-react-lite';
import { AppStore } from '../store/store';
import { SwipeListView } from 'react-native-swipe-list-view';
import SmallCard from './components/SmallCard';

export default observer(function WorkList(): React.ReactNode {

    const [rowsCount, setRowsCount] = useState(25);

    const handleEndReached = () => {
        if (rowsCount < AppStore.workBase.length) {
            setRowsCount(prevCount => prevCount + 25);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Box style={{ flex: 1 }}>
                <SwipeListView
                    data={AppStore.workBase.slice(0,rowsCount)}
                    renderItem={({ item }) => (
                        <SmallCard 
                            {...item}
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
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.1}
                    ItemSeparatorComponent={() => <Box style={{ height: 10 }} />}
                />
            </Box>
        </SafeAreaView>
    )
})
