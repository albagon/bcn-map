import React, { Component } from 'react';
import './App.css';

class PlacesPanel extends Component {
  render() {
    return (
      <div id="floating-panel">
        <select onChange={this.props.onUpdateMarkers}>
              <option value="filter" disabled defaultValue>Show me...</option>
              <option value="all">Show all places</option>
              <option value="gf-restaurant">Show GF restaurants</option>
              <option value="culture">Show Cultural Centres</option>
        </select>
      </div>
    )
  }
}

export default PlacesPanel
