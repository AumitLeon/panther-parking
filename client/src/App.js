import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ParkingMap from './components/ParkingMap';

/* eslint-disable react/prefer-stateless-function */
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to your CS312 Project</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div id="map">
          <ParkingMap />
        </div>
      </div>
    );
  }
}

export default App;
