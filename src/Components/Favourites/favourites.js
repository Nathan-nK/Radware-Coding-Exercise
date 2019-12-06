import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

@inject("favestore")
@observer
class Favourites extends Component {
    async componentDidMount() {
        // this.setState({images: this.props.favestore.GetFavList()})
        console.log(this.props.favestore.GetFavList())
        let images = await this.props.favestore.GetFavList()
        console.log(images)
        await this.setState({images: images})
    }
    constructor() {
        super()
        this.state = {
          images: [],

        }
      }
    render() {
        
        return (
            <div className="favouriteBox">
                <h2 className='favTitle'>Favourites List</h2>

        <div>{this.state.images.map(i => <img className='favPic' src={i}></img>)}</div>
            </div>
        )
    }
}

export default Favourites