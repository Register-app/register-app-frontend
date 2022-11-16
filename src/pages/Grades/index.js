import GradesButtons from "pages/Grades/GradesButtons";
import GradesTable from "pages/Grades/GradesTable";
import { Col, Container, Row } from "react-bootstrap";

const Grades = () => {
  return (
    <Container className="Grades justify-content-md-center">
      <Row>
        <Col md={9}>
          <GradesTable />
        </Col>
        <Col md={3}>
          <GradesButtons />
        </Col>
      </Row>
    </Container>
  );
};

export default Grades;
