import "components/footer/Footer.css";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="Footer footer-dark d-flex flex-column mt-2">
      <Container className="container-fluid py-1">
        <Row>
          <Col className="col-sm-6 col-md-6 item">
            <Row>
              <h3>Szkoła Podstawowa XYZ</h3>
            </Row>
            <Col>
              <small>
                <Row> Dane kontaktowe </Row>
                <Row> Rada rodziców </Row>
                <Row> Strona szkoły </Row>
              </small>
            </Col>
          </Col>
          <Col className="col-md-6 item text">
            <Row>
              <h3>e-Dziennik</h3>
            </Row>
            <small>
              <Row>
                <p>
                  Dziennik elektroniczny SP XYZ
                </p>
              </Row>
            </small>
          </Col>
          <p className="copyright">e-Dziennik © 2022</p>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
