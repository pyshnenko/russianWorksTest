import React from "react";
import LocationDisplay from "./LocationDisplay/LocationDisplay";
import { Box } from "@react-native-material/core";
import { ThemeProvider } from '@react-native-material/core';
import WorkList from "./WorkList/WorkList";
import LoadingController from "./loading/LoadingController";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function() {

    const insets = useSafeAreaInsets();

    return (
        <ThemeProvider>
            <>
                <LoadingController />
                <SafeAreaProvider>
                    <Box style={{width: '100%', height: '100%', paddingTop: insets.top, flexDirection: 'column'}}>
                        <LocationDisplay/>
                        <WorkList />
                    </Box>
                </SafeAreaProvider>
            </> 
        </ThemeProvider>
    )
}
