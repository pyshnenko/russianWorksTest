import React, {memo, useEffect} from 'react';
import { Box, IconButton, Text } from '@react-native-material/core';
import { ApiReqObjectType } from '../../types/api';
import {StyleSheet, Image, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default memo(function FullCard(props: PropsType): React.ReactNode {

    const {setOpenCardIndex, cardData} = props

    /**
     * Привяжем закрытие к кнопке "Назад"
     */
    useEffect(() => {
        const backAction = () => {
            setOpenCardIndex(-1)
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <Box style={style.fullCardStyle}>
            <IconButton icon={props => <Icon name="close" {...props} />} onPress={()=>setOpenCardIndex(-1)}/>
            <Box style={style.vacantBox}>
                <Box style={style.imgBox}>
                    <Image source={{uri: cardData.logo}} width={100} height={100} />
                    <Box style={style.raitingBox}>
                        <Text variant="h5" >{cardData.customerRating}/5</Text>
                        <Icon size={24} name='star' />
                    </Box>
                </Box>
                <Box style={style.compNameBox}>
                    {cardData.workTypes.map((item)=><Text variant="h4" key={item.id}>{item.nameOne}</Text>)}
                    <Text
                        style={style.textWrap} 
                        variant="h5"
                    >{cardData.companyName}</Text>
                </Box>
            </Box>
        </Box>
    )
})

interface PropsType {
    cardData: ApiReqObjectType,
    setOpenCardIndex: (i: number)=>void
}

const style = StyleSheet.create({
    fullCardStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        zIndex: 100,
        backgroundColor: 'gray',
        padding: 10
    },
    vacantBox: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Изменено с 'center'
        gap: 10, // Добавлено отступ между элементами
    },
    compNameBox: {
        padding: 10,
        flex: 1, // Занимает оставшееся пространство
    },
    textWrap: {
        flexWrap: 'wrap', // Разрешает перенос текста
        maxWidth: '100%', // Ограничивает ширину текста
    },
    imgBox: {
        flexDirection: 'column'
    },
    raitingBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})