import React from 'react'
import AddFavourite from '../Containers/AddFavourite';
import FavouriteList from "./FavouriteList";
import {connect} from 'react-redux'

class FavouriteComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <AddFavourite/>
        )
    }
}

export default connect()(FavouriteComponent)