import React from 'react';
import ReactDOM from 'react-dom';
import HeaderComponent from './HeaderComponent';
import MainWidget from './MainWidget';
import '../index.css';


export default class App extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.getGeolocationData = this.getGeolocationData.bind(this);
        this.writePosition = this.writePosition.bind(this);
        this.state = {
            pos: '0',
            date: new Date()
        };

    }

    writePosition(position) {
        this.setState({pos: position.coords.latitude});
        this.state.pos = position.coords;
        ReactDOM.render(
            <MainWidget coordinates={position.coords}/>,
            document.getElementById('mainWidget'));

    }

    getGeolocationData() {

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(this.writePosition);
            console.log(this.state.pos);
        } else {
            this.setState({pos: {}});
        }

    }

    render() {
        return (
            <div>
                <HeaderComponent onButtonClick={this.getGeolocationData}/>
                <div id="mainWidget"></div>
            </div>
        );
    }
}


























