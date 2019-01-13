import React, { Component } from 'react';
import './App.css';

class PlacesPanel extends Component {
  render() {
    return (
      <div id="floating-panel">
        <input onClick={this.props.onUpdateMarkers} type="button" value="hide" />
        <input onClick={this.props.onUpdateMarkers} type="button" value="show" />
      </div>
    )
  }
}

export default PlacesPanel
