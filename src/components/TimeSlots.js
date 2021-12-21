import React, { useEffect, useState } from 'react'
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
import QRCode from 'qrcode.react'
import { v4 as uuidv4 } from 'uuid'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useMqttState, useSubscription } from 'mqtt-react-hooks'

const TimeSlots = (props) => {
  let [collapse, setCollapse] = useState('-1')
  let [isOpen, setIsOpen] = useState(false)

  let [isConfirmed, setIsConfirmed] = useState(false);
  let [isRejected, setIsRejected] = useState(false);
  let [request, setRequest] = useState('');
  let [isConfirmationModalOpen, setConfirmationModalState] = useState(false);
  let [isRejectModalOpen, setRejectModalState] = useState(false);

  let name, email, mobile;
  
  const { client } = useMqttState();
  const { message } = useSubscription(`dentistimo/booking/${request.requestId}/res`)

  useEffect(() => {
    if (message === undefined) {
      return;
    }
    if (message.message !== "\"Booking request was rejected!\"" && request !== null) {
      setIsConfirmed(true)
    } else {
      setIsConfirmed(false)
      setIsRejected(true)
    }
  }, [message, request])

  const sendRequest = (message) => {
    client.publish(`dentistimo/booking/req`, JSON.stringify(message));
  }

  const toggleOnConfirmationAcceptModal = () => {
    setConfirmationModalState(!isConfirmationModalOpen)
    setIsConfirmed(!isConfirmed)
  }

  const toggleOnConfirmationRejectModal = () => {
    setRejectModalState(!isRejectModalOpen)
    setIsRejected(!isRejected)
  }

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
                  <Button color="primary" onClick={() => {
                    const request = {
                      requestId: uuidv4(),
                      clinicId: timeSlot.id,
                      startAt: timeSlot.startTime,
                      endAt: timeSlot.endTime
                    }
                    setRequest(request);
                    sendRequest(request);
                    setIsOpen(false);
                  }}>
                    Confirm
                  </Button>{' '}
                  <Button color="secondary" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            ) : null}
            {isConfirmed ? 
            <Modal toggle={toggleOnConfirmationAcceptModal} isOpen={isConfirmed} backdrop={true}>
              <ModalHeader toggle={toggleOnConfirmationAcceptModal}>
                Booking confirmed!
                </ModalHeader>
                <ModalBody>
                  Scan this QR code to get information on your booking details. Save the text to your device by copying and pasting!
                  <ModalFooter />
                  <QRCode value={JSON.stringify(request)}></QRCode>
                </ModalBody>
                </Modal> : <Modal toggle={toggleOnConfirmationRejectModal} isOpen={isRejected} backdrop={true}>
                  <ModalHeader toggle={toggleOnConfirmationRejectModal}>
                    Booking was not confirmed!
                  </ModalHeader>
                  </Modal>}
          </div>
        )
      ) : <div>No available time slots</div>}
    </div>
  )
}

export default TimeSlots
