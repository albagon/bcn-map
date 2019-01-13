import React, { Component } from 'react';
import './App.css';
import Map from './Map.js';
import PlacesPanel from './PlacesPanel.js';


// Some of this code has been copied from the Google Maps support site.
class App extends Component {
  state = {
    places : [
      {
        name: 'La Taguara Areperia',
        lat: 41.386380,
        lng: 2.182107,
        category: 'gf-restaurant'
      },
      {
        name: 'Koku Kitchen Buns',
        lat: 41.385225,
        lng: 2.184566,
        category: 'gf-restaurant'
      },
      {
        name: 'Alsur Cafe and Backdoor Bar',
        lat: 41.385757,
        lng: 2.185203,
        category: 'gf-restaurant'
      },
      {
        name: 'El Born Centre Cultural',
        lat: 41.385849,
        lng: 2.183813,
        category: 'culture'
      },
      {
        name: 'Museu Picasso de Barcelona',
        lat: 41.385240,
        lng: 2.180892,
        category: 'culture'
      }
    ],
    markers : []
  }

  // This function will update all the markers.
  updateMarkers = (event) => {
    this.state.markers.map((marker) => {
      if(event.target.value === 'hide') {
        return marker.setMap(null);
      }
      // else means the value was 'show' and we should update
      // the marker with the reference to the map.
      return marker.setMap(window.myMap);
    })

    // Do not render the markers again!!
  }

  // This function creates one marker for each place in the state.
  createMarkers(map) {
    let places = this.state.places;
    let markers = places.map((mrk) => (
      new window.google.maps.Marker({
        position: { lat: mrk.lat, lng: mrk.lng },
        map: map,
        title: mrk.name
      })
    ));
    // Update the list of markers in the state
    this.setState({ markers: markers});
  }

  render() {
    return (
      <div className="App">
        <PlacesPanel onUpdateMarkers={this.updateMarkers} />
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
            // Create all the markers in the map
            this.createMarkers(map);
          }} />
        </main>
      </div>
    );
  }
}

export default App;
