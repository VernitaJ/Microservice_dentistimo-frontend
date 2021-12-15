import './App.css'
import Map from './components/Map'
import { useSubscription, useMqttState} from 'mqtt-react-hooks'
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
const { connectionStatus } = useMqttState()
const [ messages, setMessages] = useState()
const { message } = useSubscription('frontend/availability/response')

useEffect(() => {
    if (message) {
      setMessages(message.message);
    }
}, [message])

  return (
      <div>
         <Map 
         data={messages}/>
        <Header />
        <Map />
        <Footer />
      </div>
  )
}

export default App
