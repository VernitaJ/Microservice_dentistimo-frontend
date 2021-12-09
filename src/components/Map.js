import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import dentists from '../resources/dentists.json'
import DentistTimes from './DentistTimeDisplay'

// Create an .env in the frontend with a Maps JavaScript API key.
const API_KEY = process.env.REACT_APP_GOOGLEMAPS_APIKEY

const containerStyle = {
  width: '100%',
  height: '100vh',
}

// Gothenburg coordinates
const defaultCenter = {
  lat: 57.6863144,
  lng: 11.9944233,
}
const Map = (props) => {
  const [showingInfoWindow, setShowingInfoWindow] = useState('-1');
  const [hover, setHover] = useState(false)

  // function handleClick(message) {
  //   return client.publish('frontend/availability/#', message);
  // }
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

const showWindow = (index) => {
  setShowingInfoWindow(index);
  setHover(true);
}

  // const toggleWindow = (index) => {
  //   this.infoWindow.open = this.infoWindow.open === index ? null : index
  // }

  const data = dentists;
  
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={10}
      >
      {data.dentists.map((dentist, index) => {
        return (
        <div>
          <Marker
            key = {{index}}
            onMouseOver={()=>showWindow(index)}
            // onMouseOut={()=>setShowingInfoWindow("-1")}
            position={{
            lat: dentist.coordinate.latitude,
            lng: dentist.coordinate.longitude,
            }}
        />
        {showingInfoWindow === index && hover ? <DentistTimes dentist={dentist}/>:
        <div></div>}
        </div>
          ) //lat: dentist.coordinate.latitude, lng: dentist.coordinate.longitude
        })}
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)
