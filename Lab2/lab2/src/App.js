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
      pos: ''
    };
    this.writePosition = this.writePosition.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }
  async writePosition(position) {
    this.setState({pos: position.coords});
  }
  updatePosition(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.writePosition);
    } else {
      alert('Geolocation is not supported in your browser');
    }
  }
  componentDidMount() {
    this.updatePosition();
  }

  render() {
    const position = this.state.pos;
    console.log(position);
    return(
        <div>
          <HeaderComponent onClick={this.updatePosition}/>
          <MainComponent pos={position}/>
          <FavouriteCitiesComponent/>
        </div>
    )
  }
}

export default App;
