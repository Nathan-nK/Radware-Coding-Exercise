import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

@inject("favestore")
@observer
class ImageWall extends Component {
    constructor() {
        super()
        this.state = {
            search: "",
            currentUrl: "",
            desc: "",
        }
    }


    openImage = async (e) => {
        let url = e.target.getAttribute("value")
        document.getElementById("PicPopupImg").src = url
        let PicPopup = document.getElementById("PicPopup");
        PicPopup.style.display = "block";
    }

    OpenFavTab = async (e) => {
        for (let i = 0; i < this.props.favestore.favList.length; i++) {
            if (this.props.favestore.favList[i].url == e.target.getAttribute("value")) {
                let alertmodal = document.getElementById("alertModal");
                return alertmodal.style.display = "block";

            }
        }
        this.setState({ currentUrl: e.target.getAttribute("value") })
        let modal = document.getElementById("FavModal");
        modal.style.display = "block";
    }

    AddToFave = async (e) => {
        for (let i = 0; i < this.props.favestore.favList.length; i++) {
            if (this.props.favestore.favList[i].url == e.target.getAttribute("value")) {
                let alertmodal = document.getElementById("alertModal");
                return alertmodal.style.display = "block";
            }
        }


        let modal = document.getElementById("FavModal");
        let url = this.state.currentUrl
        let desc = this.state.desc
        await this.props.favestore.AddFav(url, desc)
        modal.style.display = "none";
    }

    updateDescInpt = (e) => {
        this.setState({
            desc: e.target.value
        })
    }

    closeFavModal = async () => {
        let modal = document.getElementById("FavModal");
        modal.style.display = "none";
    }

    closeAlert = async () => {
        let modal = document.getElementById("alertModal");
        modal.style.display = "none";
    }

    closePic = async () => {
        let modal = document.getElementById("PicPopup");
        modal.style.display = "none";
    }

    render() {

        return (
            <div className="ImageWallBox">

                {this.props ? this.props.images.map(i => <div><i className="far fa-star" value={i} onClick={e => this.OpenFavTab(e)}></i>
                    <img src={i} className='image' value={i} onClick={e => this.openImage(e)}></img>


                    <div id="PicPopup" className="PicPopup" onClick={this.closePic}>
                        <div className="PicPopup-content">
                            <span className="closePic" onClick={this.closePic}>&times;</span>
                            <img id='PicPopupImg' className='PicPopupImg' src={i.url}></img>
                        </div>
                    </div>

                </div>) : null}

                <div id="FavModal" className="FavModal">
                    <div className="FavModal-content">
                        <span className="closeFavModal" onClick={this.closeFavModal}>&times;</span>
                        <div className='DescAddTitle'>Type Your Description Here:</div>
                        <textarea type="text" className='DescInpt' onChange={this.updateDescInpt}></textarea>
                        <button className="AddDescBtn" onClick={e => this.AddToFave(e)}>Add to Favourites</button>
                    </div>
                </div>

                <div id="alertModal" className="alertModal" onClick={this.closeAlert} >
                    <div className="alertModal-content">
                        <span className="close" onClick={this.closeAlert}>&times;</span>
                        <div className="alertLine">This Picture is Already in Your Favourites!</div>
                    </div>
                </div>


            </div>
        )
    }
}

export default ImageWall