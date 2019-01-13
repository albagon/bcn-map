import React, { Component } from 'react';
import './App.css';

class PlacesPanel extends Component {
  render() {
    return (
      <div id="floating-panel">
        <select onChange={this.props.onUpdateMarkers}>
              <option value="filter" disabled defaultValue>Show me...</option>
              <option value="show">Show all markers</option>
              <option value="hide">Hide all markers</option>
        </select>
      </div>
    )
  }
}

export default PlacesPanel
