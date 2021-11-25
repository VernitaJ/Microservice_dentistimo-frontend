
import { useSubscription } from 'mqtt-react-hooks';
import React from 'react'
import dentists from '../resources/dentists.json'

console.log(dentists)

export const Locations = (dentists) => {
    // const payload = useSubscription('frontend/#')
    return dentists
   }