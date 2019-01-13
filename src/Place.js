import React, { Component } from 'react';
import './App.css';

class Place extends Component {
  render() {
    return (
      <div className="place">
        <div className="place-name">{this.props.place.title}</div>
        <div className="place-category">{this.props.place.category}</div>
     </div>
    )
  }
}

export default Place
