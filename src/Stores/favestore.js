import { observable, computed, action, runInAction } from 'mobx'
import axios from "axios"

export class FaveStore {
    @observable favList = []
    
    @action
    async AddFav(data) {
        this.favList.push(data)
    }

    @action
    async RemoveFav(data) {
        for (let i = 0; i < this.favList.length; i++) {
            if (this.favList[i] == data) {
                 this.favList.splice(data)
                console.log(i)
            }
        }

    }

    @action
    async GetFavList() {
        return this.favList
    }
}