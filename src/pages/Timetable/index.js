import Timetable from "./Timetable";
import { Col, Container, Row } from "react-bootstrap";

const EventsTable = () => {
  return (
    <Container className="Attendances justify-content-md-center">
      <Row className="mb-2">
      </Row>
      <Row>
        <Col>
          <Timetable />
        </Col>
      </Row>
    </Container>
  );
};

export default EventsTable;
