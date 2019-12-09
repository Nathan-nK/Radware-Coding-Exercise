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
            newDesc: '',
            editModeEnabled: false,
        }
    }
/////////////
    handleEditClick() {
        this.setState({ editModeEnabled: !this.state.editModeEnabled });
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
        this.setState({ editModeEnabled: !this.state.editModeEnabled });
        this.setState({newDesc: ''})
    }
//////////////
    openFavImage = async (e) => {
        window.open(e.target.getAttribute("value"), '_blank');
    }

    removeFavImage = async (e) => {
        await this.props.favestore.RemoveFav(e.target.getAttribute("value"))
        this.setState({ editModeEnabled: false });
    }

    render() {

        return (
            <div className="favouriteBox">
                <h2 className='favTitle'>Favourites List</h2>

                {this.state.images.map(i => <div className="FavItem">
                    <img className='favPic' src={i.url} value={i.url} onClick={e => this.openFavImage(e)}></img>
                    {this.state.editModeEnabled ? 
                    <div>
                        <textarea className='editDescBox' onChange={e => this.updateDescInpt(e)}>{this.state.newDesc}</textarea> 
                        <button className='saveNewDescBtn' value={i.url} onClick={e => this.saveNewDesc(e)}>Save</button>
                    </div>

                    : <span className='DescBox' value={i.url}>{i.desc}</span>}

                    <div className='FavButtons'>
                        <i class="fas fa-edit" value={i.url} onClick={e => this.handleEditClick(e)}></i>
                        <i class="fas fa-trash-alt" value={i.url} onClick={e => this.removeFavImage(e)}></i></div>
                </div>)}

                {/* <div id="editModal" className="editModal">
                    <div className="editModal-content">
                        <span className="close" onClick={this.closeModal}>&times;</span>
                        <div>Type Your Description Here:</div>
                        <textarea type="text" className='DescInpt' onChange={this.updateDescInpt}></textarea>
                        <button className="AddDescBtn" onClick={e => this.AddToFave(e)}>Add</button>
                    </div>
                </div> */}

            </div>
        )
    }
}

export default Favourites