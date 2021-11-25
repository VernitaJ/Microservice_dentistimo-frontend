import React, { useEffect } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useSubscription } from 'mqtt-react-hooks';

// Create an .env in the frontend with a Maps JavaScript API key.
const API_KEY = process.env.REACT_APP_GOOGLEMAPS_APIKEY

const containerStyle = {
  width: '100%',
  height: '100vh',
}

// Gothenburg coordinates
const defaultCenter = {
  lat: 57.6863144,
  lng: 11.9944233
}

/*

## Test for mqtt connection add * <Children /> * component
const Children = () => {
  const { message, connectionStatus } = useSubscription('frontend/#');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (message) setMessages((msgs) => [...msgs, message]);
  }, [message]);

  return (
    <>
      <span>{connectionStatus}</span>
      <hr />
      <span>{JSON.stringify(messages)}</span>
    </>
  );
};   
*/


const Map  = (props) => {

  // Permission to track location doesn't do anything currently. Just enabling location tracking for future implementations/updates.
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => console.log(position))
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }) 

  return (
    <LoadScript
      googleMapsApiKey={API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)