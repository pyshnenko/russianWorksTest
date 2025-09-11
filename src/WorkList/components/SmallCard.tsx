import React, {memo} from 'react';
import { Box, Text } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import {Image} from 'react-native';

interface SmallCardProps {
    logo: string,
    companyName: string
}

export default memo(function SmallCard(props: SmallCardProps): React.ReactNode {

    const {logo, companyName} = props;

    return (
        <Box style={style.box}>
            <Image source={{uri: logo}} width={50} height={50} />
            <Text>{companyName}</Text>
        </Box>
    )
})

const style = StyleSheet.create({
    box: {
        flexDirection: 'row'
    }
})