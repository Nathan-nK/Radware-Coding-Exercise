import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

@inject("favestore")
@observer
class Favourites extends Component {
    async componentDidMount() {
        // this.setState({images: this.props.favestore.GetFavList()})
        // console.log(this.props.favestore.GetFavList())
        let images = await this.props.favestore.GetFavList()
        console.log(images)
        await this.setState({ images: images })
    }
    constructor() {
        super()
        this.state = {
            images: [],
            editable: false,
        }
    }

    openFavImage = async (e) => {
        window.open(e.target.getAttribute("value"), '_blank');
    }

    removeFavImage = async (e) => {
        await this.props.favestore.RemoveFav(e.target.getAttribute("value"))
    }

    editDesc = async () => {
        
    }

    render() {

        return (
            <div className="favouriteBox">
                <h2 className='favTitle'>Favourites List</h2>

                {this.state.images.map(i => <div className="FavItem">
                    <img className='favPic' src={i.url} value={i.url} onClick={e => this.openFavImage(e)}></img>
                    <span className='DescBox' value={i.url}>{i.desc}</span>

                    <div className='FavButtons'>
                        <i class="fas fa-edit" value={i.url} onClick={this.editDesc}></i>
                        <i class="fas fa-trash-alt" value={i.url} onClick={e => this.removeFavImage(e)}></i></div>
                </div>)}

            </div>
        )
    }
}

export default Favourites