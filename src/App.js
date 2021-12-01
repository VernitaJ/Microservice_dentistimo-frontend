import './App.css';
import Map from './components/Map'
import Test from './components/Test'
import React, { useState } from 'react';
import { Connector, useSubscription } from 'mqtt-react-hooks';
const Children = () => {
  const { connectionStatus } = useSubscription('frontend/#');
  return (
    <>
      <span>{connectionStatus}</span>
      <hr />
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
        }
        >
          <Test />
      <div>
        <Children />
         <Map 
         /> 
      </div>
    </Connector>
  )
}

export default App;
