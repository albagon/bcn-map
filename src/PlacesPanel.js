import React, { Component } from 'react';
import './App.css';

class PlacesPanel extends Component {
  render() {
    return (
      <div id="floating-panel">
        <input onClick={this.props.onClearMarkers} type="button" value="Hide Markers" />
        <input onClick={this.props.onShowMarkers} type="button" value="Show All Markers" />
        <input onClick={this.props.onDeleteMarkers} type="button" value="Delete Markers" />
      </div>
    )
  }
}

export default PlacesPanel
