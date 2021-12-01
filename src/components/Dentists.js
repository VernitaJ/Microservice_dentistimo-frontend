import React, { useEffect, useState } from 'react'
import { Marker } from '@react-google-maps/api'
import { useSubscription } from 'mqtt-react-hooks'


const Dentists = () => {
    const { message } = useSubscription('frontend/respond/dentists')

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