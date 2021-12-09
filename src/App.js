import './App.css';
import Map from './components/Map'
import { useSubscription } from 'mqtt-react-hooks';
import {useEffect, useState} from 'react'

import { useMqttState} from 'mqtt-react-hooks'
function App() {
const {client} = useMqttState();
const {connectionStatus} = useMqttState();
console.log(client)

const { message } = useSubscription([
  "frontend/availability"
]);

setInterval(() => {
  client.publish('frontend/availability', "heyyy")
  }, 4000)

  return (
      <div>
        <h1>Connection: {connectionStatus}</h1>
         <Map 
         />
      </div>
  )
}

export default App;
