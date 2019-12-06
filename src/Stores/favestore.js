import { observable, computed, action, runInAction } from 'mobx'
import axios from "axios"

export class FaveStore {
    @observable favList = []

    @action
    async AddFav(data) {
        this.favList.push(data)
        console.log(data)
    }

    @action
    async GetFavList() {
        return this.favList
    }
}