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
              <option value="Bed & Breakfast">Bed & Breakfast</option>
              <option value="Coffee Shop">Coffee Shops</option>
              <option value="Museum">Museums</option>
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
