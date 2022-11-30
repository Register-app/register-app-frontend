import GradesButtons from "pages/Grades/GradesButtons";
import GradesTable from "pages/Grades/GradesTable";
import { Col, Container, Row } from "react-bootstrap";
import TopBar from "./TopBar";

const Grades = () => {
  return (
    <Container className="Grades justify-content-md-center">
      <Row className="mb-2">
        <TopBar />
      </Row>
      <Row>
        <Col md={10}>
          <GradesTable />
        </Col>
        <Col md={2}>
          <GradesButtons />
        </Col>
      </Row>
    </Container>
  );
};

export default Grades;
