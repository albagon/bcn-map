import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import * as AppAPI from './AppAPI'
import InfoWindow from './InfoWindow.js'
import './App.css';
import Map from './Map.js';
import PlacesPanel from './PlacesPanel.js';


// Some of this code has been inspired by the Google Maps support site
// and stackoverflow.com
class App extends Component {
  state = {
    markers : [],
    response : {},
    infoWindows : []
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
    let venues = this.state.response.venues;
    let markers = venues.map((v) => (
          new window.google.maps.Marker({
          position: { lat: v.location.lat, lng: v.location.lng },
          category: v.categories[0].name,
          map: map,
          title: v.name
        })
    ));
    // Update the list of markers in the state
    this.setState({ markers: markers});
  }

  // This function adds one infoWindow to each marker in the array.
  // The content of the infoWindow is a <InfoWindow />
  createInfoWindows= (map) => {
    let markers = this.state.markers;
    let infoWindows = [];

    for (let i = 0; i < markers.length; i++) {
      let contentString = renderToString(<InfoWindow venue={this.state.response.venues[i]} />)

      let infowindow = new window.google.maps.InfoWindow({
        content: contentString
      });

      markers[i].addListener('click', function() {
        infowindow.open(map, markers[i]);
      });

      infoWindows.push(infowindow);
    }
    return infoWindows;
  }

  animateMarker= (event) => {
    // Find the marker that should be animated
    for (var i = 0; i < this.state.markers.length; i++) {
      if (this.state.markers[i].title === event.target.title) {
        window.setTimeout(
          this.state.markers[i].setAnimation(window.google.maps.Animation.BOUNCE)
        , 300);
        // End the animation
        this.state.markers[i].setAnimation(null);
        this.state.infoWindows[i].open(window.myMap, this.state.markers[i]);
      }
    }
  }

  componentDidMount() {
    AppAPI.getAll().then((response) => {
      // Important: We need to set the state before calling createMarkers
      this.setState({ response });
      this.createMarkers(window.myMap);
      let infoWindows = this.createInfoWindows(window.myMap);
      this.setState({ infoWindows });
    })
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
            center: { lat: 41.384457, lng: 2.182452 },
            zoom: 17
          }}
          onMapLoad={map => {
            // This is how I used to create all the markers and infoWindows
            //this.createMarkers(map);
            //this.createInfoWindows(map);
          }} />
        </main>
      </div>
    );
  }
}

export default App;
