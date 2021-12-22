import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import DentistTimes from './DentistTimeDisplay'
import SideSlide from './SideSlide'
import { useSubscription, useMqttState } from 'mqtt-react-hooks'
import { v4 as uuidv4 } from 'uuid'
// import dentists from '../resources/dentists.json' //Vernita's test data

// Create an .env in the frontend with a Maps JavaScript API key.
const API_KEY = process.env.REACT_APP_GOOGLEMAPS_APIKEY

const containerStyle = {
  width: '100%',
  height: '100vh',
  zIndex: 0,
}

const clientReq = {
  requestId: uuidv4(),
  requestType: 'getAll',
}

// Gothenburg coordinates
const defaultCenter = {
  lat: 57.6993349,
  lng: 11.9644233,
}
const Map = () => {
  const [showingInfoWindow, setShowingInfoWindow] = useState('-1')
  const [showSideBar, setShowSideBar] = useState(false)
  const { client } = useMqttState()
  const { message } = useSubscription(
    `frontend/dentist/${clientReq.requestId}/res`
  )
  const [data, setData] = useState()
  useEffect(() => {
    if (client) {
      client.publish(`frontend/dentist/req`, JSON.stringify(clientReq))
    }
  }, [client])

  useEffect(() => {
    if (message) {
      setData(JSON.parse(message.message).response)
    }
  }, [message])

  function sideBarHandler(show) {
    setShowSideBar(show)
  }

  // Permission to track location doesn't do anything currently. Just enabling location tracking for future implementations/updates.
  const showWindow = (index) => {
    setShowingInfoWindow(index)
    sideBarHandler(false)
  }

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={13}
        onClick={() => {
          showWindow(-1)
          sideBarHandler(false)
        }}
      >
        {showSideBar ? (
          <SideSlide
            handleSideBar={sideBarHandler}
            clinicId={showingInfoWindow}
            dentist={data[showingInfoWindow]}
          />
        ) : null}
        {data
          ? data.map((dentist, index) => {
              return (
                <div key={index}>
                  <Marker
                    onClick={() => showWindow(index)}
                    position={{
                      lat: Number(dentist.coordinate.latitude),
                      lng: Number(dentist.coordinate.longitude),
                    }}
                  />
                  {showingInfoWindow === index ? (
                    <DentistTimes
                      dentist={dentist}
                      calendarHandler={sideBarHandler}
                      showWindow={showWindow}
                    />
                  ) : null}
                </div>
              ) 
            })
          : null}
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)
