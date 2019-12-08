import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

@inject("favestore")
@observer
class ImageWall extends Component {
    constructor() {
        super()
        this.state = {
            search: "potato",
            category: "name",
        }
    }

    openImage = async (e) => {
        window.open(e.target.getAttribute("value"), '_blank');
    }

    AddToFave = async (e) => {
        for (let i = 0; i<this.props.favestore.favList.length; i++) {
            if(this.props.favestore.favList[i] == e.target.getAttribute("value")) {
               return alert("Picture Already in Favourites")
            }
        }
         await this.props.favestore.AddFav(e.target.getAttribute("value"))

    }

    render() {

        return (
            <div className="ImageWallBox">
                {this.props ? this.props.images.map(i => <div><i class="far fa-star" value={i} onClick={e => this.AddToFave(e)}></i>
                    <img src={i} className='image' value={i} onClick={e => this.openImage(e)}></img></div>) : null}
            </div>
        )
    }
}

export default ImageWall