import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

class Favourites extends Component {
    render() {
        
        return (
            <div className="favouriteBox">
                <h2 className='favTitle'>Favourites List</h2>
            </div>
        )
    }
}

export default Favourites