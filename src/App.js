import React, { Component } from 'react';
import * as AppAPI from './AppAPI'
import './App.css';
import Map from './Map.js';
import PlacesPanel from './PlacesPanel.js';


// Some of this code has been inspired by the Google Maps support site
// and stackoverflow.com
class App extends Component {
  state = {
    markers : [],
    response : {}
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
  // The content of the infoWindow is the title of the marker.
  // TODO: Create an InfoWindow component that receives the following props:
  // map and markers
  createInfoWindows= (map) => {
    let markers = this.state.markers;

    for (let i = 0; i < markers.length; i++) {
      let contentString = '<div id="content">'+
          '<p>'+markers[i].title+'</p>'+
          '</div>';

      let infowindow = new window.google.maps.InfoWindow({
        content: contentString
      });

      // TODO: Maybe make an array of infowindows.
      // infowindows.push(infowindow);
      markers[i].addListener('click', function() {
        infowindow.open(map, markers[i]);
      });
    }
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

  componentDidMount() {
    AppAPI.getAll().then((response) => {
      this.setState({ response });
      this.createMarkers(window.myMap);
      this.createInfoWindows(window.myMap);
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
            // Create all the markers in the map
            //this.createMarkers(map);
            //this.createInfoWindows(map);
          }} />
          {/* TODO: Here I should insert one InfoWindow component for each marker.
            That means using the map method for this.state.markers or using a for.
            Each InfoWindow component will do what createInfoWindows method
            does (create the content, create the infoWindow and add it to
            the marker). The content of each infoWindow will be the result of
            calling a third party API, for example Foursquare.
            */}
        </main>
      </div>
    );
  }
}

export default App;
