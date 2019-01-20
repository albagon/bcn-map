import React, { Component } from 'react';
import './App.css';

class Place extends Component {
  render() {
    return (
      <button title={this.props.title} className="place">{this.props.place.title}</button>
    )
  }
}

export default Place
