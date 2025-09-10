import React from "react";
import { reqLocationPermission } from "./helpers/permissions";
import Geolocation from "@react-native-community/geolocation";
import { Button, Text, Box } from "@react-native-material/core";
import { observer } from "mobx-react-lite";
import { AppStore } from "../store/store";
import { LocationStatus } from "../types/storeTypes";

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
                AppStore.setLocationStatus(LocationStatus.Error);
            },
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 } // Опции для получения данных
        );
    };

    return (
        <Box>
            <Button title="Получить координаты" onPress={()=>{           
                getLocation()
                }} />
            {true && (
                <Box>
                    <Text>{AppStore.locationMessage}</Text>
                    <Text>Широта: {AppStore.lat}</Text>
                    <Text>Долгота: {AppStore.lot}</Text>
                </Box>
            )}
        </Box>
    )
})