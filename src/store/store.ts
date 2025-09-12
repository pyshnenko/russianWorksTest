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
        this.lat = 55.803131;//loc.latitude;
        this.lot = 37.606331;//loc.longitude;
        this.setLocationStatus(LocationStatus.DataReady);
        workUpd(this.lat, this.lot);
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
            case LocationStatus.AwaitWorkBase: {
                this.locationMessage = LocationStatusMessage.AwaitWorkBase;
                break;
            }
            case LocationStatus.DataReady: {
                this.locationMessage = LocationStatusMessage.DataReady;
                break;
            }
            case LocationStatus.FullDataReady: {
                this.locationMessage = LocationStatusMessage.FullDataReady;
                break;
            }
            case LocationStatus.ErrorLocation: {
                this.locationMessage = LocationStatusMessage.ErrorLocation;
                break;
            }
            case LocationStatus.ErrorData: {
                this.locationMessage = LocationStatusMessage.ErrorData;
                break;
            }
        }
    }

    setWorkBase(base: ApiReqObjectType[]) {
        this.workBase = base;
        this.setLocationStatus(base.length ? LocationStatus.FullDataReady : LocationStatus.ErrorData);
    }
}

export const AppStore = new Store();