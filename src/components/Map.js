import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import DentistTimes from './DentistTimeDisplay'
import SideSlide from './SideSlide'
import { useSubscription, useMqttState } from 'mqtt-react-hooks'
import { v4 as uuidv4 } from 'uuid';

import data from '../resources/dentists.json'

// Create an .env in the frontend with a Maps JavaScript API key.
const API_KEY = process.env.REACT_APP_GOOGLEMAPS_APIKEY

const containerStyle = {
  width: '100%',
  height: '100vh',
  zIndex: 0
}

const clientReq = 
{
  requestId:uuidv4(),
  requestType: 'getAll',
  }


// Gothenburg coordinates
const defaultCenter = {
  lat: 57.6863144,
  lng: 11.9944233,
}
const Map = (props) => {
  const [showingInfoWindow, setShowingInfoWindow] = useState('-1');
  const { client } = useMqttState();
  const [showSideBar, setShowSideBar] = useState(false)
  const { message } = useSubscription(`frontend/dentist/${clientReq.requestId}/res`)

  useEffect(() => {
    if (client) {
      client.publish(`frontend/dentist/req`, JSON.stringify(clientReq))
    } 
  }, [client])
  
  useEffect(() => {
    if(message) {
      console.log(message)
    }
  }, [message])

  

  function sideBarHandler(show) {
    setShowSideBar(show)
  }

  // function handleClick(message) {
  //   return client.publish('frontend/availability/#', message);
  // }

  // Permission to track location doesn't do anything currently. Just enabling location tracking for future implementations/updates.

  //const { message } = useSubscription('frontend/respond/1/dentists')
  //console.log(message)
  //const data = message.message;

const showWindow = (index) => {
  setShowingInfoWindow(index);
}
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={10}
        onClick={()=> {showWindow(-1); sideBarHandler(false)}}
      >
      {showSideBar ? <SideSlide handleSideBar={sideBarHandler}/> : null}
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
