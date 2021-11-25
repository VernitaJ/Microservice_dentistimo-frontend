import './App.css';
import Map from './components/Map'
import React, { useEffect, useState } from 'react';
import { Connector, useSubscription } from 'mqtt-react-hooks';
import dentists from './resources/dentists.json'


const Locations = () => {
  let coordinates = []
  const message =  dentists //useSubscription('frontend/dentists'); need to allign this with backend
  message.dentists.forEach(e => { 
  coordinates.push(e.coordinate)
});
  return (
    <>
      <span>{ JSON.stringify(coordinates) }</span>
    </>
  );
};   



function App() {
  return (
    <Connector brokerUrl="ws://localhost:9001" options={
      {
          username: "frontend",
          password: "1234"
      }
        }>
      <Locations />
      <div>
         <Map 
         /> 
      </div>
    </Connector>
  )
}

export default App;
