import React from 'react'
import '../Map.css'
import { InfoWindow } from '@react-google-maps/api'
import TimeSlots from './TimeSlots'

const DentistTimes = (props) => {

const mqtt = require('mqtt');
const client = mqtt.connect('wss://test.mosquitto.org:9001');

client.on('connect', () => {
  setInterval(() => {
    client.publish('frontend/availability', 'I find this interesting');
    console.log("published")
}, 3000);
});

  return (
    <div>
      {console.log('table here', props.dentist)}
      <InfoWindow
        position={{
          lat: props.dentist.coordinate.latitude,
          lng: props.dentist.coordinate.longitude,
        }}
      >
        <div className="informationWindow">
        <TimeSlots/>
          <h2>{props.dentist.name}</h2>
          <h4>Monday : {props.dentist.openinghours.monday}</h4>
          <h4>Tuesday : {props.dentist.openinghours.tuesday}</h4>
          <h4>Wednesday : {props.dentist.openinghours.wednesday}</h4>
          <h4>Thursday : {props.dentist.openinghours.thursday}</h4>
          <h4>Friday : {props.dentist.openinghours.friday}</h4>
        </div>
      </InfoWindow>
    </div>
  )
}

export default DentistTimes
