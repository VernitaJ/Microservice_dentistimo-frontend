import './App.css';
import Map from './components/Map'
import { useSubscription } from 'mqtt-react-hooks'
import { useEffect,useState } from 'react'
import { useMqttState} from 'mqtt-react-hooks'

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
        <h1>Connection: {connectionStatus}</h1>
        <h2>Msg: {JSON.stringify(messages)}</h2>
         <Map 
         data={messages}/>
      </div>
  )
}

export default App;
