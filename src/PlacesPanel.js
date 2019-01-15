import React, { Component } from 'react';
import './App.css';
import Place from './Place.js';

class PlacesPanel extends Component {
  state = {
    filter: ''
  }

  updateFilter = (e) => {
    this.props.onUpdateMarkers(e);
    this.setState({ filter: e.target.value})
  }

  render() {
    return (
      <div id="floating-panel">
        <h2 className="panel-title">Places to visit</h2>
        <p>Filter:</p>
        <select value={this.state.filter} onChange={this.updateFilter}>
              <option value="all" defaultValue>All places</option>
              <option value="gf-restaurant">Gluten-Free Restaurants</option>
              <option value="culture">Cultural Centres</option>
              <option value="architecture">Famous Buildings</option>
        </select>
				<div className="panel-list-container">
 					<ol onClick={this.props.onAnimateMarker} className="panel-list">
   					{this.props.markers.filter((m) => m.map === window.myMap).map((mk) => (
    					<li key={mk.title}>
      					{<Place title={mk.title} place={mk} />}
    					</li>
    				))}
  				</ol>
				</div>
      </div>
    )
  }
}

export default PlacesPanel
