import React from 'react'
import ReactDOM from 'react-dom';

export default class HeaderComponent extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.geolocationHandler = this.geolocationHandler.bind(this);
    }

    geolocationHandler(e) {
        this.props.onButtonClick(e.target.value);
    }


    render() {
        return (<header>
            <div className='gridHeader'>
                <div className='logo'>
                    <a>Погода здесь</a>
                </div>
                <div className='locationButton'>
                    <button onClick={this.geolocationHandler}> Обновить локацию</button>
                </div>
            </div>
        </header>);
    }
}