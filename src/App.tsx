import React from "react";
import {observer} from 'mobx-react-lite';
import LocationDisplay from "./LocationDisplay/LocationDisplay";
import { Box } from "@react-native-material/core";
import { ThemeProvider, defaultTheme } from '@react-native-material/core';
import WorkList from "./WorkList/WorkList";

export default observer(() => {

    return (
        <ThemeProvider>
            <>            
                <Box style={{height: '100%', width: '100%', flexDirection: 'column'}}>
                    <LocationDisplay/>
                    <WorkList />
                </Box>
            </>
        </ThemeProvider>
    )
})
