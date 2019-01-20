import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import * as AppAPI from './AppAPI'
import InfoWindow from './InfoWindow.js'
import './App.css';
import Map from './Map.js';
import PlacesPanel from './PlacesPanel.js';
import ErrorMsg from './ErrorMsg.js';


// Some of this code has been inspired by the Google Maps support site
// stackoverflow.com and w3schools.com
class App extends Component {
  state = {
    markers : [],
    response : {},
    infoWindows : [],
    error : false
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
    // Close floating panel
    this.togglePanel();
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

  showError = () => {
    this.setState({ error: true });
  }

  hideError = () => {
    this.setState({ error: false });
  }

  togglePanel= () => {
    var x = document.getElementById("floating-panel");
    var t = document.getElementById("tb");
    var h = document.getElementById("title");
    var m = document.getElementById("map");
    if (x.style.display === "none" || x.style.display === "") {
      t.innerHTML = "&times;";
      t.style.color = "black";
      t.style.fontSize = "2.4em";
      x.style.display = "block";
      // Change the widths of the map and the panel if the screen
      // size is equal or bigger than 600px
      if(window.screen.width >= 600) {
        h.style.width = "calc(100% - 270px)";
        m.style.width = "calc(100% - 270px)";
      }
    } else {
      t.innerHTML = "&#9776;";
      t.style.color = "white";
      x.style.display = "none";
      // Change the widths of the map and the panel if the screen
      // size is equal or bigger than 600px
      if(window.screen.width >= 600) {
        h.style.width = "100%";
        m.style.width = "100%";
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
    }).catch(error => this.showError())
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <PlacesPanel onAnimateMarker={this.animateMarker} onUpdateMarkers={this.updateMarkers} markers={this.state.markers}/>
          <div className="App-header-content" id="title">
            <div className="App-name-wrapper">
              <button className="toggle-button" onClick={this.togglePanel} id="tb" aria-label="Toggle Navigation Bar">&#9776;</button>
              <h1 className="App-name">Barcelona Map</h1>
            </div>
            <ErrorMsg error={this.state.error} role="alert">
              <span className="error-message">Sorry, something went wrong. Please try again or contact me at albatgonzalezm@gmail.com.</span>
            </ErrorMsg>
          </div>
        </header>
        <main className="App-main">
        <Map
          id="map"
          options={{
            center: { lat: 41.384457, lng: 2.182452 },
            zoom: 15
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
