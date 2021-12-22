import { useMqttState, useSubscription } from 'mqtt-react-hooks'
import { v4 as uuidv4 } from 'uuid'
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

const BookingModal = (props) => {
  let { client } = useMqttState()
  let [isConfirmed, setIsConfirmed] = useState(false)
  let [isRejected, setIsRejected] = useState(false)
  let [request, setRequest] = useState('')
  let [isConfirmationModalOpen, setConfirmationModalState] = useState(false)
  let [isRejectModalOpen, setRejectModalState] = useState(false)
  let name, email, mobile, patientMessage

  const { message } = useSubscription(
    `dentistimo/booking/${request.requestId}/res`
  )

  useEffect(() => {
    if (message === undefined) {
      return
    }
    if (
      message.message !== '"Booking request was rejected!"' &&
      request !== null
    ) {
      setIsConfirmed(true)
    } else {
      setIsConfirmed(false)
      setIsRejected(true)
    }
  }, [message, request])

  const sendRequest = (message) => {
    client.publish(`dentistimo/booking/req`, JSON.stringify(message))
  }

  const toggleOnConfirmationAcceptModal = () => {
    setConfirmationModalState(!isConfirmationModalOpen)
    setIsConfirmed(!isConfirmed)
    props.handleSidebar(false)
  }

  const toggleOnConfirmationRejectModal = () => {
    setRejectModalState(!isRejectModalOpen)
    setIsRejected(!isRejected)
  }

  return (
    <div>
      <Modal isOpen={props.isOpen} className="booking-modal" backdrop={true}>
        <ModalHeader>
          You've selected: {props.timeslot.startAt.substring(11, 16)} -{' '}
          {props.timeslot.endAt.substring(11, 16)}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="user">Full Name</Label>
              <Input
                type="text"
                name="name"
                value={name}
                onChange={(e) => (name = e.target.value)}
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
                onChange={(e) => (email = e.target.value)}
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
                onChange={(e) => (mobile = e.target.value)}
                id="mobile"
                placeholder="070-007-0007"
              />
            </FormGroup>
            <FormGroup>
              <Label for="user">Message</Label>
              <Input
                type="text"
                name="message"
                value={patientMessage}
                onChange={(e) => (patientMessage = e.target.value)}
                id="message"
                placeholder="Optional message to dentist"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              const request = {
                requestId: uuidv4(),
                clinicId: props.clinicId,
                startAt: props.timeslot.startAt,
                endAt: props.timeslot.endAt,
                patientName: name,
                patientEmail: email,
                patientPhone: mobile,
                message: patientMessage,
              }
              setRequest(request)
              sendRequest(request)
              props.toggle(props.timeslot._id.$oid)
            }}
          >
            Confirm
          </Button>{' '}
          <Button color="secondary" onClick={() => props.toggle(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {isConfirmed ? (
        <Modal
          toggle={toggleOnConfirmationAcceptModal}
          isOpen={isConfirmed}
          backdrop={true}
          className="booking-modal"
        >
          <ModalHeader toggle={toggleOnConfirmationAcceptModal}>
            Booking confirmed!
          </ModalHeader>
          <ModalBody>
            Scan this QR code to get information on your booking details. Save
            the text to your device by copying and pasting!
            <ModalFooter />
            <QRCode value={JSON.stringify(request)}></QRCode>
          </ModalBody>
        </Modal>
      ) : (
        <Modal
          toggle={toggleOnConfirmationRejectModal}
          isOpen={isRejected}
          backdrop={true}
          className="booking-modal"
        >
          <ModalHeader toggle={toggleOnConfirmationRejectModal}>
            Booking was not confirmed!
          </ModalHeader>
        </Modal>
      )}
    </div>
  )
}

export default BookingModal
