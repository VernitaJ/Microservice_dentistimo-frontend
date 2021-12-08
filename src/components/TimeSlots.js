import React, { useReducer } from "react";
import {
  Card,
  CardTitle,
  Col,
  Container,
  Row
} from "reactstrap";
import initialTimeSlots from "../timeslots.json";
import "bootstrap/dist/css/bootstrap.min.css";

const TimeSlots = ()  => {
const todayTime = Date.now();
let timeslots = initialTimeSlots;
  return (
    <>
      <div className="text-sm-left text-md-center">
        <Container>
          <hr className="my-2" />
          <p className="lead">
            Available time slots{" "}
          </p>
          <p>
            Time slots marked in <span className="red-text">red</span> are
            already booked.
          </p>
        </Container>
      </div>
      <Container className="App">
        <Row>
          {timeslots.map(({ id, startTime, endTime, booked }) => {
            if (startTime > todayTime) {
              return (
                <Col sm={{ size: 8, offset: 2 }} key={id}>
                  <Card body key={id}>
                    <CardTitle tag="h5">{`${startTime} - ${endTime}`}</CardTitle>
                  </Card>
                </Col>
              );
            }
            return (
              <Col sm={{ size: 8, offset: 2 }} key={id}>
                <Card body key={id} color="danger" outline>
                  <CardTitle tag="h5">{`${startTime} - ${endTime}`}</CardTitle>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default TimeSlots