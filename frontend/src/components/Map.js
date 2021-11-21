import React, { useEffect } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

// Create an .env in the frontend with a Maps JavaScript API key.
const API_KEY = process.env.REACT_APP_GOOGLEMAPS_APIKEY

const containerStyle = {
  width: '400px',
  height: '400px'
};

// TODO: Use geolocation to center map towards user location
const center = {
  lat: 57.6863144,
  lng: 11.9944233
}

const Map = () => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => console.log(position))
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }) 
  return (
    <LoadScript
      googleMapsApiKey={API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)