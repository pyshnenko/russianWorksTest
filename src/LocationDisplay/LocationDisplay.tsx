import React, {useEffect} from "react";
import { reqLocationPermission } from "./helpers/permissions";
import Geolocation from "@react-native-community/geolocation";
import { Button, Text, Box, IconButton } from "@react-native-material/core";
import { observer } from "mobx-react-lite";
import { AppStore } from "../store/store";
import { LocationStatus } from "../types/storeTypes";
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from "react-native";

export default observer(function LocationDisplay(): React.ReactNode {

    const getLocation = async () => {
        AppStore.setLocationStatus(LocationStatus.AwaitData);
        const hasPermission = await reqLocationPermission();
        if (!hasPermission) {
            AppStore.setLocationStatus(LocationStatus.NoPermission);
            return;
        }

        Geolocation.getCurrentPosition(
            (position) => {
                console.log('Позиция получена:', position);
                AppStore.setLocation(position.coords)
            },
            (error) => {
                AppStore.setLocationStatus(LocationStatus.ErrorLocation);
            },
            { 
                enableHighAccuracy: false, //задача - определять город. Высокая точность не нужна и замедлит работу
                timeout: 30000, 
                maximumAge: 5 * 60 * 1000 //кэш позиции на 5 минут. Сомнительно что пользователь сможет быстрее покинуть город
            }
        );
    };

    useEffect(()=>{
        getLocation()
    },[])

    return (
        <Box>
            {true && (
                <Box style={styled.bigBlock}>
                    <Box style={styled.smollBlock}>
                        <Text>Широта: {AppStore.lat}</Text>
                        <Text>Долгота: {AppStore.lot}</Text>
                    </Box>
                    <IconButton icon={props => <Icon name="refresh" {...props} />} onPress={getLocation} />
                </Box>
            )}
        </Box>
    )
})

const styled = StyleSheet.create({
    smollBlock: {
        flexDirection: 'column'
    },
    bigBlock: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})