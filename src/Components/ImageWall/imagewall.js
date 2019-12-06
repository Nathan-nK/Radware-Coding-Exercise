import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

class ImageWall extends Component {
    openImage = (url) => {
        // window.open(url, '_blank');
        console.log(url)
    }
    render() {

        return (
            <div className="ImageWallBox">
                {this.props ? this.props.images.map(i => <img src={i} className='image' onClick={this.openImage(i)}></img>) : null}
            </div>
        )
    }
}

export default ImageWall