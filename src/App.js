import React, { Component } from 'react';
import './App.css';
import Map from './Map';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Barcelona Map
        </header>
        <main className="App-main">
        <Map
          id="map"
          options={{
            center: { lat: 41.384457, lng: 2.182452 },
            zoom: 17
          }}
          onMapLoad={map => {
            var marker = new window.google.maps.Marker({
              position: { lat: 41.384457, lng: 2.182452 },
              map: map,
              title: 'Hello Barcelona!'
            });
          }} />
        </main>
      </div>
    );
  }
}

export default App;
