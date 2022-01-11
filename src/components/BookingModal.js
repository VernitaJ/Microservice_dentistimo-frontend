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
  let [errorMessage, setErrorMessage] = useState('')
  const { message } = useSubscription(
    `dentistimo/booking/${request.requestId}/res`
  )

  const sendUserInput = () => {
    let nameregex = new RegExp(/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/)
    let mobileregex = new RegExp(/^[0-9]{10}$/)
    let emailregex = new RegExp(/^\w+([.-]?\w+)@\w+([.-]?\w+)*(.\w{2,3})+$/)
    let error = "";
    if (!nameregex.test(name)) {
      error += '\n' + 'Enter a valid name.'
      name = ""
    }
    if (!emailregex.test(email)) {
      error += '\n' + 'Enter a valid email address.'
      email = ""
    }
    if (!mobileregex.test(mobile)) {
      error += '\n' + 'Enter a valid mobile number.'
      mobile = ""
    }
    setErrorMessage(error)
    if (error === "") {
      const req = {
        requestId: uuidv4(),
        clinicId: String(props.timeslot.clinicId),
        startAt: props.timeslot.startAt,
        endAt: props.timeslot.endAt,
        patientName: name,
        patientEmail: email,
        patientPhone: mobile,
        message: patientMessage,
      }
      setRequest(req)
      sendRequest(req)
    }
  }

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

  const sendRequest = (msg) => {
    client.publish(`dentistimo/booking/req`, JSON.stringify(msg))
    // await message from backend
    setTimeout(() => {props.toggle(props.timeslot._id)}, 5000);
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
          {errorMessage && <div className="error"> {errorMessage} </div>}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => sendUserInput()}
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
