import React, { Component } from 'react';
import '../headerStyle.css';
export default class HeaderComponent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <header className='header'>
                <h1 className='header__title'>Weather</h1>
                <button className='header__button' onClick={this.props.onClick}>Update Location</button>
            </header>
        )
    }
}