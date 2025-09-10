import Api from '../api/api'
import type {ApiReqObjectType} from '../types/api';
import {AppStore} from './store'

export function workUpd(lat: number, lot: number) {
    console.log('work')
    Api.upd(lat, lot)
        .then((res: ApiReqObjectType[] | null) => {
            console.log(res)
            if (res) AppStore.setWorkBase(res)
            else AppStore.setWorkBase([])
        })
        .catch((err)=>console.log(err))
}