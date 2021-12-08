import './App.css';
import Map from './components/Map'
import {useEffect, useState} from 'react'

import { useMqttState} from 'mqtt-react-hooks'
function App() {
const {client, connectionStatus} = useMqttState();
// console.log(client)
// const client = mqtt.connect('wss://test.mosquitto.org:9001');

// client.on('connect', () => {
//   console.log("you are here")
//     client.subscribe("frontend/availability")
// });

// setInterval(() => {
//   client.publish('frontend/availability', "heyyy")
//   }, 4000)

  return (
      <div>
        <h1>Connection: {connectionStatus}</h1>
       
         <Map 
         />
      </div>
  )
}

export default App;
