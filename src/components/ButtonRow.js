import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style/custom.css";

const ButtonRow = () => {
  return (
    <Container className="Navigation">
      <Row className="text-center mt-3">
        <Col>
          <Link to="/lesson-plan" class="btn btn-primary">
            Plan zajęć
          </Link>
        </Col>
        <Col>
          <Link to="/grades" class="btn btn-danger">
            Oceny
          </Link>
        </Col>
        <Col>
          <Link to="/timetable" class="btn btn-success">
            Terminarz
          </Link>
        </Col>
        <Col>
          <Link to="/messages" class="btn btn-warning">
            Wiadomości
          </Link>
        </Col>
        <Col>
          <Link to="/frequency" class="btn btn-info">
            Frekwencja
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ButtonRow;
