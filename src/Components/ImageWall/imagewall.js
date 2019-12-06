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
        // console.log(e.target.getAttribute("value"));
        window.open(e.target.getAttribute("value"), '_blank');
        await this.props.favestore.AddFav(e.target.getAttribute("value"))
    }
    render() {

        return (
            <div className="ImageWallBox">
                {this.props ? this.props.images.map(i => <img src={i} className='image' value={i} onClick={e => this.openImage(e)}></img>) : null}
            </div>
        )
    }
}

export default ImageWall