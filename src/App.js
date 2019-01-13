import React, { Component } from 'react';
import './App.css';
import Map from './Map.js';
import PlacesPanel from './PlacesPanel.js';


// Some of this code has been inspired by the Google Maps support site
// and stackoverflow.com
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
      },
      {
        name: 'Fundación Antoni Tàpies',
        lat: 41.391556,
        lng: 2.163764,
        category: 'culture'
      },
      {
        name: 'La Sagrada Familia',
        lat: 41.403555,
        lng: 2.174353,
        category: 'architecture'
      },
      {
        name: 'Casa Batlló',
        lat: 41.391638,
        lng: 2.164775,
        category: 'architecture'
      },
      {
        name: 'Arc de Triomf',
        lat: 41.391058,
        lng: 2.180649,
        category: 'architecture'
      }
    ],
    markers : []
  }

  // This function will update all the markers.
  updateMarkers = (event) => {
    if(event.target.value === 'all') {
      // The user wants to see all the places/markers
      for (let i = 0; i < this.state.markers.length; i++) {
        this.state.markers[i].setMap(window.myMap);
      }
    } else {
      // The user wants to filter the list of places/markers
      for (let i = 0; i < this.state.markers.length; i++) {
        if(this.state.markers[i].category !== event.target.value) {
          // The user wants to hide this marker
          this.state.markers[i].setMap(null);
        } else {
          this.state.markers[i].setMap(window.myMap);
        }
      }
    }

    // Do not render the markers again!!
  }

  // This function creates one marker for each place in the state.
  createMarkers(map) {
    let places = this.state.places;
    let markers = places.map((mrk) => (
      new window.google.maps.Marker({
        position: { lat: mrk.lat, lng: mrk.lng },
        category: mrk.category,
        map: map,
        title: mrk.name
      })
    ));
    // Update the list of markers in the state
    this.setState({ markers: markers});
  }

  animateMarker= (event) => {
    // Find the marker that should be animated
    for (var i = 0; i < this.state.markers.length; i++) {
      if (this.state.markers[i].title === event.target.title) {
        //this.state.markers[i].setAnimation(window.google.maps.Animation.BOUNCE);
        window.setTimeout(
          this.state.markers[i].setAnimation(window.google.maps.Animation.BOUNCE)
        , 300);
        // End the animation
        this.state.markers[i].setAnimation(null);
      }
    }
  }

  render() {
    return (
      <div className="App">
        <PlacesPanel onAnimateMarker={this.animateMarker} onUpdateMarkers={this.updateMarkers} markers={this.state.markers}/>
        <header className="App-header">
          Barcelona Map
        </header>
        <main className="App-main">
        <Map
          id="map"
          options={{
            center: { lat: 41.394905, lng: 2.175561 },
            zoom: 15
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
