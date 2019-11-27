import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as contactAction from './actions/favouriteCityAction';
import HeaderComponent from './components/HeaderComponent'
import MainComponent from "./components/MainComponent";
import './index.css';
import FavouriteCitiesComponent from "./components/FavouriteCitiesComponent";

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      name: '',
      latitude: 0,
      longitude: 0,
      loaded: false,
    };
    this.writePosition = this.writePosition.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }
  async writePosition(position) {
    this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude, loaded: true});

  }
  updatePosition(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.writePosition, ()=>{
        this.setState({latitude: 0,longitude:0, loaded: true}) });
    } else {
      alert('Geolocation is not supported in your browser');
    }
  }
  componentDidMount() {
    this.updatePosition();
  }

  render() {
    const latitude = this.state.latitude;
    const longitude = this.state.longitude;
    const loaded = this.state.loaded;
    return(
        <div>
          <HeaderComponent onClick={this.updatePosition}/>
          <MainComponent latitude={latitude} longitude={longitude} loaded={loaded}/>
          <FavouriteCitiesComponent/>
        </div>
    )
  }
}

export default App;
