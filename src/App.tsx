import React from "react";
import LocationDisplay from "./LocationDisplay/LocationDisplay";
import { Box, useTheme } from "@react-native-material/core";
import { ThemeProvider } from '@react-native-material/core';
import WorkList from "./WorkList/WorkList";
import LoadingController from "./loading/LoadingController";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PropsType {
    isDarkMode: boolean,
}
export default function({isDarkMode}: PropsType) {
    console.log(isDarkMode)

    const insets = useSafeAreaInsets();

    return (
        <ThemeProvider>
            <Box style={{width: '100%', height: '100%', backgroundColor: isDarkMode ? '#000000' : '#FFFFFF'}}>
                <LoadingController />
                <SafeAreaProvider>
                    <Box style={{width: '100%', height: '100%', paddingTop: insets.top, flexDirection: 'column'}}>
                        <LocationDisplay/>
                        <WorkList />
                    </Box>
                </SafeAreaProvider>
            </Box> 
        </ThemeProvider>
    )
}
