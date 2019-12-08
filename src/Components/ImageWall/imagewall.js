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
        window.open(e.target.getAttribute("value"), '_blank');
    }

    // checkIfInFaves = async (e) => {
    //     document.getElementsByClassName("fa-star").style.color = "blue";
    // }

    AddToFave = async (e) => {
        for (let i = 0; i < this.props.favestore.favList.length; i++) {
            if (this.props.favestore.favList[i].url == e.target.getAttribute("value")) {
                let alertmodal = document.getElementById("alertModal");
                return alertmodal.style.display = "block";

            }
        }
        let modal = document.getElementById("myModal");
        modal.style.display = "block";
        this.setState({ currentUrl: e.target.getAttribute("value") })
        await this.props.favestore.AddFav(e.target.getAttribute("value"))

    }

    updateDescInpt = (event) => {
        this.setState({
            desc: event.target.value
        })
    }

    AddDesc = async (e) => {
        let modal = document.getElementById("myModal");
        let url = this.state.currentUrl
        let desc = this.state.desc
        await this.props.favestore.AddDesc(url, desc)
        modal.style.display = "none";
    }


    closeModal = async () => {
        let modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    closeAlert = async () => {
        let modal = document.getElementById("alertModal");
        modal.style.display = "none";
    }



    render() {

        return (
            <div className="ImageWallBox">

                {this.props ? this.props.images.map(i => <div><i className="far fa-star" value={i} onClick={e => this.AddToFave(e)}></i>
                    <img src={i} className='image' value={i} onClick={e => this.openImage(e)}></img> </div>) : null}

                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={this.closeModal}>&times;</span>
                        <div>Type Your Description Here:</div>
                        <textarea type="text" className='DescInpt' onChange={this.updateDescInpt}></textarea>
                        <button className="AddDescBtn" onClick={e => this.AddDesc(e)}>Add</button>
                    </div>
                </div>

                <div id="alertModal" className="alertModal" >
                    <div className="alertModal-content">
                        <span className="closeAlert" onClick={this.closeAlert}>&times;</span>
                        <div className="alertLine">This Picture is Already in Your Favourites!</div>
                    </div>
                </div>

            </div>
        )
    }
}

export default ImageWall