import { observable, computed, action, runInAction } from 'mobx'
import axios from "axios"

export class FaveStore {
    @observable favList = []

    @action
    async resetFave() {
        let local = await JSON.parse(localStorage.getItem("faveItem"))
        if(local) {
            this.favList = local
            
        }
        console.log(this.favList)
    }


    @action
    async AddFav(url, desc) {
        this.favList.push({ url: url, desc: desc, isEditable: false })
        await localStorage.setItem("faveItem", JSON.stringify(this.favList))
    }

    @action
    async RemoveFav(data) {
        for (let i = 0; i < this.favList.length; i++) {
            if (this.favList[i].url === data) {
                this.favList.splice(i, 1)
            }
        }
        await localStorage.setItem("faveItem", JSON.stringify(this.favList))
    }

    @action
    async EditDesc(url, desc) {
        this.favList.find((o) => o.url === url).desc = desc;
        await localStorage.setItem("faveItem", JSON.stringify(this.favList))
    }

    @action
    async GetFavList() {
        return this.favList
    }

    @action
    async OpenDescEdit(url) {
        let isEditable = this.favList.find((o) => o.url === url).isEditable
        this.favList.find((o) => o.url === url).isEditable = !isEditable
        await localStorage.setItem("faveItem", JSON.stringify(this.favList))
    }

}