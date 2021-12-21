import React, { useState, useEffect } from 'react'
import Calendar from './Calendar'
import '../App.css'
import TimeSlots from './TimeSlots'
import { useSubscription, useMqttState } from 'mqtt-react-hooks'

// @ts-check
const SideSlide = (props) => {
  let [date, setDate] = useState('')
  const { client } = useMqttState()
  const [timeslots, setTimeslots] = useState()
  let [request, setRequest] = useState({
    requestId: useUniqueId(),
    clinicId: props.clinicId + 1,
  })

  const { message } = useSubscription([
    `frontend/timeslot/${request.requestId}/res`,
  ])

  useEffect(() => {
    if (client) {
      console.log('publishing..')
      client.publish('frontend/timeslot/req', JSON.stringify(request))
    }
  }, [client])

  function useUniqueId() {
    const [id] = useState(
      () => `component-${Math.random().toString(16).slice(2)}`
    )
    return id
  }


  useEffect(() => {
    if (message) {
      setTimeslots(JSON.parse(message.message))
      console.log(message)
    }
  }, [message])

  const handleSelect = (date) => {
    setDate(date)
  }

  return (
    <div className="side-bar">
      <h4 className="side-bar-heading">
        {props.dentist ? props.dentist.name : null}
      </h4>
      <button className="side-close" onClick={() => props.handleSideBar(false)}>
        Cancel
      </button>
      <Calendar handleSelect={handleSelect} className="calendar" />
      <TimeSlots date={date} timeslots={timeslots} clinicId={request.clinicId} handleSideBar={props.handleSideBar}/>
    </div>
  )
}

export default SideSlide
