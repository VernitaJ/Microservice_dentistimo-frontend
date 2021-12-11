import React from 'react'
import '../Map.css'
import { useMqttState } from 'mqtt-react-hooks'
import { InfoWindow } from '@react-google-maps/api'
// import TimeSlots from './TimeSlots' 

const DentistTimes = (props) => {
const { client } = useMqttState();
client.publish('frontend/availability/response', 'some_data')

  return (
    <div>
      <InfoWindow
      className="background"
        position={{
          lat: props.dentist.coordinate.latitude,
          lng: props.dentist.coordinate.longitude,
        }}
        options={{
          pixelOffset: new window.google.maps.Size(
            0, -30
          )
        }}
        onMouseOut={() => {props.showWindow("-1")}}
      >
       
        <div className="informationWindow">
          <h2>{props.dentist.name}</h2>
          <h4>Monday : {props.dentist.openinghours.monday}</h4>
          <h4>Tuesday : {props.dentist.openinghours.tuesday}</h4>
          <h4>Wednesday : {props.dentist.openinghours.wednesday}</h4>
          <h4>Thursday : {props.dentist.openinghours.thursday}</h4>
          <h4>Friday : {props.dentist.openinghours.friday}</h4>
        <button onClick={() => {props.calendarHandler(true)}}/>
        </div>
      </InfoWindow>
    </div>
  )
}

export default DentistTimes
