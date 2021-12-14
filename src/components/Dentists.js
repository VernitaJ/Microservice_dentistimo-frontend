import React, { useEffect, useState } from 'react'
import { Marker } from '@react-google-maps/api'
import { useSubscription, useMqttState } from 'mqtt-react-hooks'

const req = 
{
  "requestId":"1",
  "requestType": "getAll",
  }
  

const Dentists = () => {
    const { client } = useMqttState();

    client.publish('frontend/dentist/req', JSON.stringify(req))
    const { message } = useSubscription('frontend/respond/1/dentists')
  
    if (message) {
      const x = JSON.parse(message.message)
      return (
        <>
          { console.log(x)}{
          x.dentists.map((dentist, index) => {
            return (
              <Marker
                key={{ index }}
                position={{
                  lat: dentist.coordinate.latitude,
                  lng: dentist.coordinate.longitude,
                }}
              />
            )
          })}
        </>
      )
    } else {
      return <></>
    }
  }
  export default Dentists