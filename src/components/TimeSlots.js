import React, { useState } from 'react'
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
  let name, email, mobile;

  const toggle = (index) => {
    setCollapse(index)
    setIsOpen(!isOpen)
  }

  let dateslots = props.timeslots.filter((timeSlots) => timeSlots.date === (props.date))

  return (
    <div>
      {dateslots.length > 0 ? dateslots.map(timeSlot => (
          <div key={timeSlot.startAt}>
            <Button
              color="primary"
              onClick={() => toggle(timeSlot.id)}
              style={{ marginBottom: '1rem' }}
            >
              {timeSlot.startTime} - {timeSlot.endTime}
            </Button>
            {timeSlot.id === collapse ? (
              <Modal isOpen={isOpen} className="booking-modal" backdrop={true}>
                <ModalHeader>
                  You've selected: {timeSlot.startTime} - {timeSlot.endTime}
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
                  <Button color="primary" onClick={() => console.log('submit appointment for ', name, " for ", timeSlot.date, " email ", email)}>
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
