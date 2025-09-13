import React from "react";
import LocationDisplay from "./LocationDisplay/LocationDisplay";
import { Box } from "@react-native-material/core";
import { ThemeProvider, darkTheme, defaultTheme, Theme } from '@react-native-material/core';
import WorkList from "./WorkList/WorkList";
import LoadingController from "./loading/LoadingController";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PropsType {
    isDarkMode: boolean,
}

/**
 * Основной компонент приложения, который управляет темой (темный/светлый режим) и макетом.
 *
 * @param isDarkMode - Флаг, определяющий, включена ли темная тема
 */
export default function({isDarkMode}: PropsType) {
    console.log(isDarkMode)

    const insets = useSafeAreaInsets();

    return (
        <ThemeProvider>
            <Box style={{
                width: '100%', 
                height: '100%', 
                backgroundColor: isDarkMode ? '#000000' : '#FFFFFF'
            }}>
                {/* Компонент отображения состояния загрузки */}
                <LoadingController />
                 {/* Обеспечивает безопасную область для контента (например, избегает наложения на системные панели) */}
                <SafeAreaProvider>
                    <Box style={{
                        width: '100%', 
                        height: '100%', 
                        paddingTop: insets.top, 
                        flexDirection: 'column'
                    }}>
                        {/* Компонент отображения информации о локации */}
                        <LocationDisplay/>
                        {/* Компонент отображения вакансий */}
                        <WorkList />
                    </Box>
                </SafeAreaProvider>
            </Box> 
        </ThemeProvider>
    )
}
