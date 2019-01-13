import React, { Component } from 'react';
import './App.css';
import Place from './Place.js';

class PlacesPanel extends Component {
  render() {
    return (
      <div id="floating-panel">
        <h2 className="panel-title">Places to visit</h2>
        <select onChange={this.props.onUpdateMarkers}>
              <option value="" defaultValue>Show me...</option>
              <option value="all">All places</option>
              <option value="gf-restaurant">GF Restaurants</option>
              <option value="culture">Cultural Centres</option>
              <option value="architecture">Famous Buildings</option>
        </select>
				<div className="panel-list-container">
 					<ol className="panel-list">
   					{this.props.markers.filter((m) => m.map === window.myMap).map((mk) => (
    					<li key={mk.title}>
      					{<Place place={mk} />}
    					</li>
    				))}
  				</ol>
				</div>
      </div>
    )
  }
}

export default PlacesPanel
