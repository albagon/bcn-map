import React, { Component } from 'react';
import './App.css';

class Place extends Component {
  render() {
    return (
      <div title={this.props.title} className="place">{this.props.place.title}</div>
    )
  }
}

export default Place
