import './App.css'
import Map from './components/Map'
import { useSubscription, useMqttState} from 'mqtt-react-hooks'
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

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
