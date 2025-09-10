import React from 'react';
import type { ApiReqObjectType } from '../types/api';
import axios from 'axios';
import { Box } from '@react-native-material/core';
import { FlatList, TouchableOpacity } from 'react-native';
import {observer} from 'mobx-react-lite';
import {AppStore} from '../store/store';
import { ListItem } from "@react-native-material/core";

export default observer(function WorkList(): React.ReactNode {

    React.useEffect(() => {
        console.log('Статус изменился!', AppStore.locationStatus)
        /*axios.get<ApiReqObjectType>('http://localhost:3000/api/workList')
            .then((res) => {
                AppStore.setWorkList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });*/
    }, [AppStore.locationStatus])

    return (
        <Box>
            {AppStore.workBase.map((item: ApiReqObjectType, index: number) => 
                <ListItem
                    key={item.id}
                    title={item.companyName}
                />
            )}
        </Box>
    )
})