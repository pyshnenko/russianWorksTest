import { makeAutoObservable } from 'mobx';
import type {Location} from '../types/location';
import { LocationStatusMessage, LocationStatus } from '../types/storeTypes';
import type {ApiReqObjectType} from '../types/api';
import {workUpd} from './helper'

class Store {
    lat = 0;
    lot = 0;
    locationMessage: LocationStatusMessage = LocationStatusMessage.NoData;
    locationStatus: LocationStatus = LocationStatus.NoData;
    workBase: ApiReqObjectType[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    setLocation(loc: Location) {
        this.lat = loc.latitude
        this.lot = loc.longitude
        this.locationStatus = LocationStatus.DataReady;
        workUpd(loc.latitude, loc.longitude);
        this.locationMessage = LocationStatusMessage.DataReady;
    }

    setLocationStatus(status: LocationStatus) {
        this.locationStatus = status;
        switch (status) {
            case LocationStatus.NoData: {
                this.locationMessage = LocationStatusMessage.NoData;
                break;
            }
            case LocationStatus.NoPermission: {
                this.locationMessage = LocationStatusMessage.NotPermission;
                break;
            }
            case LocationStatus.AwaitData: {
                this.locationMessage = LocationStatusMessage.AwaitData;
                break;
            }
            case LocationStatus.Error: {
                this.locationMessage = LocationStatusMessage.Error;
                break;
            }
        }
    }

    setWorkBase(base: ApiReqObjectType[]) {
        this.workBase = base;
    }
}

export const AppStore = new Store();