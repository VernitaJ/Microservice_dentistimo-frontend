
import { useSubscription } from 'mqtt-react-hooks';
import React from 'react'
import dentists from '../resources/dentists.json'


const Dentists = () => {
    let coordinates = []
    const message =  dentists //useSubscription('frontend/dentists'); need to allign this with backend
    message.dentists.forEach(e => { 
    setMarker(e.coordinates)
  });
  };
  

  export default Dentists