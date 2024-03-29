import { useMqttState } from 'mqtt-react-hooks'
import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import BookingModal from './BookingModal'

const TimeSlots = (props) => {
  let [collapse, setCollapse] = useState('-1')
  let [isOpen, setIsOpen] = useState(false)
  const { client } = useMqttState()

  let slots,
    dateslots = []

  if (props.timeslots) {
    console.log(props.timeslots)
    slots = props.timeslots.response.filter((timeslot) => timeslot.startAt.substring(0,10) === props.date && timeslot.clinicId === props.clinicId && timeslot.status === 'available')
    dateslots = [
      ...new Map(slots.map((item) => [item['startAt'], item])).values(),
    ]
  }

  const toggle = (index) => {
    setCollapse(index)
    setIsOpen(!isOpen)
  }

  return (
    <div className="timeslot-container">
      <div className="timeslot-buttons">
        {dateslots.length > 0 ? (
          dateslots.map((timeSlot) => (
            <div key={timeSlot._id}>
              <Button
                color="primary"
                onClick={() => toggle(timeSlot._id)}
                style={{ margin: '0.3rem', padding: '0.2rem', width: '8.5rem' }}
              >
                {timeSlot.startAt.substring(11, 16)} -{' '}
                {timeSlot.endAt.substring(11, 16)}
              </Button>
              {timeSlot._id === collapse ? <BookingModal handleSidebar={props.handleSidebar} isOpen={isOpen} toggle={toggle} timeslot={timeSlot} /> : null}
            </div>
          ))
        ) : (
          <div>No available time slots</div>
        )}
      </div>
    </div>
  )
}

export default TimeSlots
