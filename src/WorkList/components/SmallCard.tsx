import React, {memo} from 'react';
import { Box, Text } from '@react-native-material/core';
import Paper from '../../ui/Paper';
import { StyleSheet } from 'react-native';
import {Image} from 'react-native';
import { WorkType } from '../../types/api';

interface SmallCardProps {
    logo: string,
    companyName: string,
    workTypes: WorkType[],
    priceWorker: number,
}

export default memo(function SmallCard(props: SmallCardProps): React.ReactNode {

    const {logo, companyName, workTypes, priceWorker} = props;

    return (
        <Paper style={style.box}>
            <Box>
                {workTypes.map((item: WorkType, index: number)=>
                    <Text style={{ fontWeight: 'bold' }} key={item.id}>{item.nameOne}</Text>
                )}
                <Text>{priceWorker} руб. за смену</Text>
                <Text>{companyName}</Text>
            </Box>
            <Image source={{uri: logo}} width={50} height={50} />
        </Paper>
    )
})

const style = StyleSheet.create({
    box: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 8
    },
    vacantionBox: {
        flexDirection: 'column',
        maxWidth: '80%'
    }
})