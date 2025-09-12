import React, {memo} from 'react';
import { Box, Text } from '@react-native-material/core';
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
        <Box style={style.box}>
            <Box>
                <Text>{companyName}</Text>
                {workTypes.map((item: WorkType, index: number)=>
                    <Text key={item.id}>{item.nameOne}</Text>
                )}
                <Text>{priceWorker}</Text>
            </Box>
            <Image source={{uri: logo}} width={50} height={50} />
        </Box>
    )
})

const style = StyleSheet.create({
    box: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    vacantionBox: {
        flexDirection: 'column',
        maxWidth: '80%'
    }
})