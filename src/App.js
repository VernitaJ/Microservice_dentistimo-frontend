import './App.css';
import Map from './components/Map'
import React, { useEffect, useState } from 'react';
import { Connector, useSubscription } from 'mqtt-react-hooks';

function App() {
  return (
    <Connector brokerUrl="ws://localhost:9001" options={
      {
          username: "frontend",
          password: "1234"
      }
        }>
      <div>
         <Map 
         /> 
      </div>
    </Connector>
  )
}

export default App;
