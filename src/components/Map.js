import React, { useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { useSubscription } from 'mqtt-react-hooks'
import dentists from '../resources/dentists.json'

// Create an .env in the frontend with a Maps JavaScript API key.
const API_KEY = process.env.REACT_APP_GOOGLEMAPS_APIKEY

const containerStyle = {
  width: '100%',
  height: '100vh',
}
let coordinate
// Gothenburg coordinates
const defaultCenter = {
  lat: 57.6863144,
  lng: 11.9944233,
}
const Map = (props) => {
  // Permission to track location doesn't do anything currently. Just enabling location tracking for future implementations/updates.
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        console.log(position)
      )
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  })

  const message = dentists //useSubscription('frontend/dentists'); need to allign this with backend
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={10}
      >
        {message.dentists.map((dentist) => {
          return (<Marker
            position={{
              lat: dentist.coordinate.latitude,
              lng: dentist.coordinate.longitude,
            }}
          />) //lat: dentist.coordinate.latitude, lng: dentist.coordinate.longitude
        })}
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)
