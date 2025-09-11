import React from 'react';
import {observer} from 'mobx-react-lite';
import {AppStore} from '../store/store';
import AnimatedModal from '../Animated/AnimatedModal';
import Loading from './Loading';
import {LocationStatus} from '../types/storeTypes';

export default observer(function LoadingController(): React.ReactNode {
    return (
        <AnimatedModal isVisible={(AppStore.locationStatus >= LocationStatus.AwaitData && 
          AppStore.locationStatus < LocationStatus.FullDataReady)}>
            <Loading />
        </AnimatedModal>
    )
})