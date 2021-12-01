import './App.css'
import Map from './components/Map'
import React, { useEffect, useState } from 'react'
import { Connector, useSubscription } from 'mqtt-react-hooks'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
function App() {
  return (
    <Connector
      brokerUrl="ws://localhost:9001"
      options={{
        username: 'frontend',
        password: '1234',
      }}
    >
      <div>
        <Header />
        <Map />
        <Footer />
      </div>
    </Connector>
  )
}

export default App
