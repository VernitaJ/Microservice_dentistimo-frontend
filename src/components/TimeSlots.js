import React, { useState } from 'react'
import { useMqttState, useSubscription } from 'mqtt-react-hooks'
import { v4 as uuidv4 } from 'uuid'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


const TimeSlots = (props) => {
  let [collapse, setCollapse] = useState('-1')
  let [isOpen, setIsOpen] = useState(false)
  const {client} = useMqttState()
  let name, email, mobile;


  const toggle = (index) => {
    setCollapse(index)
    setIsOpen(!isOpen)
  }
  let dateslots = []
  console.log(props.timeslots)
  if (props.timeslots) {
    dateslots= props.timeslots.response.filter((timeslot) => timeslot.startAt.substring(0,10) === props.date && timeslot.clinicId === props.clinicId)
  }
  const handleSubmit = (startAt, endAt) => {
    const request = {
      requestId: uuidv4(),
      clinicId: props.clinicId,
      startAt: startAt,
      endAt: endAt,
  }
    client.publish('frontend/booking/req', request)

  }

  return (
    <div>
      {dateslots.length > 0 ? dateslots.map(timeSlot => (
          <div key={timeSlot._id}>
            <Button
              color="primary"
              onClick={() => toggle(timeSlot._id)}
              style={{ marginBottom: '1rem' }}
            >
              {timeSlot.startAt.substring(11,16)} - {timeSlot.endAt.substring(11,16)}
            </Button>
            {timeSlot._id === collapse ? (
              <Modal isOpen={isOpen} className="booking-modal" backdrop={true}>
                <ModalHeader>
                  You've selected: {timeSlot.startAt.substring(11,16)} - {timeSlot.endAt.substring(11,16)}
                </ModalHeader>
                <ModalBody>
                  <Form>
                    <FormGroup>
                      <Label for="user">Full Name</Label>
                      <Input
                        type="text"
                        name="name"
                        value={name}
                        onChange={e => name = e.target.value}
                        id="user-name"
                        placeholder="name"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        value={email}
                        onChange={e => email = e.target.value}
                        id="exampleEmail"
                        placeholder="email"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="mobileNumer">Mobile</Label>
                      <Input
                        type="text"
                        name="mobile"
                        value={mobile}
                        onChange={e => mobile = e.target.value}
                        id="mobile"
                        placeholder="070-007-0007"
                      />
                    </FormGroup>
                  </Form>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={() => handleSubmit()}>
                    Confirm
                  </Button>{' '}
                  <Button color="secondary" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            ) : null}
          </div>
        )
      ) : <div>No available time slots</div>}
    </div>
  )
}

export default TimeSlots
