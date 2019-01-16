import React from 'react';
import './App.css';
import * as AppAPI from './AppAPI'

const InfoWindow = ({ venue }) => {
  return <div className='contentHolder'>
          <div className='iconCol'>
            <div className='iconContainer'>
              <img className='icon' src={venue.categories[0].icon.prefix+'64'+venue.categories[0].icon.suffix} alt={venue.categories[0].name} />
            </div>
          </div>
          <div className='infoCol'>
            <div className='venueBlock'>
              <div className='venueDetails'>
                <div className='venueName'>
                  <h2><a href={'http://foursquare.com/v/'+venue.id+'?ref='+AppAPI.CLIENT_ID} target='blank'>{venue.name}</a></h2>
                </div>
                <div className='venueAddressData'>
                  <div className='venueData'>
                    <span className='categoryName'>{venue.categories[0].name}</span>
                  </div>
                  <div className='venueAddress'>{venue.location.formattedAddress.join(', ')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
}

export default InfoWindow
