import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

@inject("favestore")
@observer
class Favourites extends Component {
    
    async componentDidMount() {
        await this.props.favestore.resetFave()
        let images = await this.props.favestore.GetFavList()
        await this.setState({ images: images })
        console.log(images)
    }

    constructor() {
        super()
        this.state = {
            images: [],
            newDesc: '',
        }
    }
    /////////////
    handleEditClick = async (e) => {
        for (let i = 0; i < this.props.favestore.favList.length; i++) {
            if (this.props.favestore.favList[i].isEditable == true) {
                let modal = document.getElementById("FavError");
                return modal.style.display = "block";
                
            }
        }
        await this.props.favestore.OpenDescEdit(e.target.getAttribute("value"))
    }

    updateDescInpt = (e) => {
        this.setState({
            newDesc: e.target.value
        })
    }

    saveNewDesc(e) {
        let url = e.target.getAttribute("value")
        let newDesc = this.state.newDesc
        this.props.favestore.EditDesc(url, newDesc)
        this.props.favestore.OpenDescEdit(e.target.getAttribute("value"))
        this.setState({ newDesc: '' })
    }

    CancelNewDesc(e) {
        this.props.favestore.OpenDescEdit(e.target.getAttribute("value"))
    }
    //////////////

    openFavImage = async (e) => {
        let url = e.target.getAttribute("value")
        document.getElementById("PicPopupImg").src = url
        let PicPopup = document.getElementById("PicPopup");
        PicPopup.style.display = "block";
    }

    closePic = async () => {
        let modal = document.getElementById("PicPopup");
        modal.style.display = "none";
    }

    closeError = async () => {
        let modal = document.getElementById("FavError");
        modal.style.display = "none";
    }

    removeFavImage = async (e) => {
        await this.props.favestore.RemoveFav(e.target.getAttribute("value"))
        this.setState({ editModeEnabled: false });
    }

    render() {

        return (
            <div className="favouriteBox" style={{ height: `${this.state.images.length * 5 + (0.5 * this.state.images.length) + 6}vw` }}>

                <h2 className='favTitle'>Favourites List</h2>

                {this.state.images.map(i => <div className="FavItem">
                    <img className='favPic' src={i.url} value={i.url} onClick={e => this.openFavImage(e)}></img>
                    {i.isEditable ?
                        <div>
                            <textarea className='editDescBox' id='editDescBox' name={i.desc} onChange={e => this.updateDescInpt(e)}></textarea>

                            <div className='EditButtons'>
                            <i class="fas fa-save"  value={i.url} onClick={e => this.saveNewDesc(e)}></i>
                            <i class="fas fa-window-close" value={i.url} onClick={e => this.CancelNewDesc(e)}></i>
                            </div>
                        </div>

                        : <div className='DescButtons'>
                            <p className='DescBox' value={i.url}>{i.desc}</p>
                            <div className='FavButtons'>
                            <i class="fas fa-edit" id='editButton' value={i.url} data={i.desc} onClick={e => { this.handleEditClick(e) }}></i>
                            <i class="fas fa-trash-alt" value={i.url} onClick={e => this.removeFavImage(e)}></i></div>
                            </div>}



                    <div id="PicPopup" className="PicPopup" onClick={this.closePic}>
                        <div className="PicPopup-content">
                            <span className="closePic" onClick={this.closePic}>&times;</span>
                            <img id='PicPopupImg' className='PicPopupImg' src={i.url}></img>
                        </div>
                    </div>

                </div>)}

                <div id="FavError" className="FavError" onClick={this.closeError}>
                        <div className="FavError-content">
                            <span className="closeFavError" onClick={this.closeError}>&times;</span>
                            <div className="alertLine">You Can Only Edit One Item at a Time!</div>
                        </div>
                    </div>


            </div>
        )
    }
}

export default Favourites