import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import dentists from '../resources/dentists.json'
import DentistTimes from './DentistTimeDisplay'
import { useMqttState } from 'mqtt-react-hooks'
import SideSlide from './SideSlide'
import Dentists from './Dentists'

// Create an .env in the frontend with a Maps JavaScript API key.
const API_KEY = process.env.REACT_APP_GOOGLEMAPS_APIKEY

const containerStyle = {
  width: '100%',
  height: '100vh',
  zIndex: 0
}

// Gothenburg coordinates
const defaultCenter = {
  lat: 57.6863144,
  lng: 11.9944233,
}
const Map = (props) => {
  const [showingInfoWindow, setShowingInfoWindow] = useState('-1');
  const [showSideBar, setShowSideBar] = useState(false)
  
  function sideBarHandler(show) {
    setShowSideBar(show)
  }

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
  sideBarHandler(false);
}

  const data = dentists;
  
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={10}
        onClick={()=> {showWindow(-1); sideBarHandler(false)}}
      >
      {showSideBar ? <SideSlide handleSideBar={sideBarHandler} clinicId={showingInfoWindow} dentist={data.dentists[showingInfoWindow]}/> : null}
      {data.dentists.map((dentist, index) => {
        return (
        <div 
        key = {index}>
          <Marker
            onClick={()=>showWindow(index)}
            position={{
            lat: dentist.coordinate.latitude,
            lng: dentist.coordinate.longitude,
            }}
        />
        {showingInfoWindow === index ? <DentistTimes dentist={dentist} calendarHandler={sideBarHandler} showWindow={showWindow}/> : null}
        </div>
          ) //lat: dentist.coordinate.latitude, lng: dentist.coordinate.longitude
        })}
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)
