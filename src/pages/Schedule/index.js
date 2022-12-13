import Schedule from "./Schedule";
import { Col, Container, Row } from "react-bootstrap";
import useAuth from "hooks/useAuth";
import { checkRoles } from "utils/checkRoles";

const EventsTable = () => {
  const { user } = useAuth();
  return (
    <Container className="Attendances justify-content-md-center">
      <Row className="mb-2">
      </Row>
      <Row>
        <Col>
        <Schedule />
        </Col>
      </Row>
    </Container>
  );
};

export default EventsTable;
