import React from 'react';
import './App.css';

const InfoWindow = ({ venue }) => {
  /*return '<div id="content">'+
      '<p>'+venues[index].name+'</p>'+
      '</div>'*/
  return <div><h1>Hello {venue.name}</h1></div>
}

export default InfoWindow
