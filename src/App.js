import React, { Component } from 'react';
import './App.css';
import Map from './Map';


// Some of this code has been copied from the Google Maps support site.
class App extends Component {
  state = {
    markers : [
      {
        name: 'La Taguara Areperia',
        lat: 41.386380,
        lng: 2.182107
      },
      {
        name: 'Koku Kitchen Buns',
        lat: 41.385225,
        lng: 2.184566
      },
      {
        name: 'Alsur Cafe and Backdoor Bar',
        lat: 41.385886,
        lng: 2.185207
      }
    ]
  }

  createMarkers(map, filter) {
    let markers;
    if(filter === 'all') {
      // Create all markers
      markers = this.state.markers;
    }
    markers.map((mrk) => {
      return new window.google.maps.Marker({
        position: { lat: mrk.lat, lng: mrk.lng },
        map: map,
        title: mrk.name
      })
    });
  }

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
            zoom: 16
          }}
          onMapLoad={map => {
            // TODO: here I should call a function that creates
            // all the markers (a list of places). I should pass the reference
            // to the map and the filter.
            this.createMarkers(map, 'all');
          }} />
        </main>
      </div>
    );
  }
}

export default App;
