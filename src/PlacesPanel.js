import React, { Component } from 'react';
import './App.css';
import Place from './Place.js';
import foursquare from './img/powered-by-foursquare-blue.png';

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
      <nav id="floating-panel" >
        <h2 className="panel-title">Places to visit</h2>
        <div className="panel-filter-container">
          <p>Filter:</p>
          <select className="panel-select" value={this.state.filter} onChange={this.updateFilter} tabIndex="0" aria-label="Filter venues">
                <option value="all" defaultValue>All places</option>
                <option value="Art Museum">Art Museum</option>
                <option value="Bakery">Bakery</option>
                <option value="Bed & Breakfast">Bed & Breakfast</option>
                <option value="Cafeteria">Cafeteria</option>
                <option value="Coffee Shop">Coffee Shop</option>
                <option value="French Restaurant">French Restaurant</option>
          </select>
        </div>
				<div className="panel-list-container">
          <div className="panel-list">
 					  <ul className="panel-list" onClick={this.props.onAnimateMarker} >
   					  {this.props.markers.filter((m) => m.map === window.myMap).map((mk) => (
    					  <li key={mk.title}>
      					  {<Place title={mk.title} place={mk} />}
    					  </li>
    				  ))}
  				  </ul>
          </div>
          <div className="attribution-container">
            <img className='foursquare-logo' src={foursquare} alt={'Powered by Foursquare'} />
          </div>
				</div>
      </nav>
    )
  }
}

export default PlacesPanel
