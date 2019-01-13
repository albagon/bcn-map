import React, { Component } from 'react';
import './App.css';

class PlacesPanel extends Component {
  render() {
    return (
      <div id="floating-panel">
        <h2 className="panel-title">Places to visit</h2>
        <select onChange={this.props.onUpdateMarkers}>
              <option value="filter" disabled defaultValue>Show me...</option>
              <option value="all">Show all places</option>
              <option value="gf-restaurant">Show GF restaurants</option>
              <option value="culture">Show Cultural Centres</option>
        </select>
				<div className="panel-list-container">
 					<ol className="panel-list">
   					{this.props.markers.filter((m) => m.map === window.myMap).map((mk) => (
    					<li key={mk.title}>
      					{/*<Book onMoveBook={this.props.onMoveBook} book={bk}/>*/
                  mk.title
                }
    					</li>
    				))}
  				</ol>
				</div>
      </div>
    )
  }
}

export default PlacesPanel
