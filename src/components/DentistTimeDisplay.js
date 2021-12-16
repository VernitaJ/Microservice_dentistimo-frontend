import React from 'react'
import '../Map.css'
import { useMqttState } from 'mqtt-react-hooks'
import { InfoWindow } from '@react-google-maps/api'
// import TimeSlots from './TimeSlots'

const DentistTimes = (props) => {
  const { client } = useMqttState()
  client.publish('frontend/availability/response', 'some_data')

  return (
    <div>
      <InfoWindow
        className="background"
        position={{
          lat: Number(props.dentist.coordinate.latitude),
          lng: Number(props.dentist.coordinate.longitude),
        }}
        options={{
          pixelOffset: new window.google.maps.Size(0, -30),
        }}
      >
        <div className="informationWindow">
          <h3 className="dentistHeading">{props.dentist.name}</h3>
          <div className="dentistDetail">
            <p>Monday : {props.dentist.openingHours.monday}</p>
            <p>Tuesday : {props.dentist.openingHours.tuesday}</p>
            <p>Wednesday : {props.dentist.openingHours.wednesday}</p>
            <p>Thursday : {props.dentist.openingHours.thursday}</p>
            <p>Friday : {props.dentist.openingHours.friday}</p>
            <div className="dentistExtraDetail">
              <p>
                {props.dentist.address} {props.dentist.city} 
              </p>
              <p> Dentists: {props.dentist.dentists}</p>
            </div>
          </div>
          <button
            className="bookingButton"
            onClick={() => {
              props.calendarHandler(true)
            }}
          >
            Book a visit
          </button>
        </div>
      </InfoWindow>
    </div>
  )
}

export default DentistTimes
