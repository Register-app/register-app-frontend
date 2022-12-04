import AttendancesButtons from "pages/Attendances/AttendancesButtons";
import AttendancesTable from "pages/Attendances/AttendancesTable";
import { Col, Container, Row } from "react-bootstrap";
import TopBar from "./TopBar";

const Attendances = () => {
  return (
    <Container className="Attendances justify-content-md-center">
      <Row className="mb-2">

      </Row>
      <Row>
        <Col md={10}>
          <AttendancesTable />
        </Col>
        <Col md={2}>
          <AttendancesButtons />
        </Col>
      </Row>
    </Container>
  );
};

export default Attendances;
