import "bootstrap/dist/css/bootstrap.min.css";
import "./style/custom.css";
import {Container, Row, Col} from 'react-bootstrap';

function Footer() {
    return(
      <footer className="footer-dark d-flex flex-column vh-10">
            <Container className="container-fluid py-1">
                <Row>
                    <Col className="col-sm-6 col-md-6 item">
                        <Row><h3>Services</h3></Row>
                        <Col>
                            <small>
                                <Row> Web design </Row>
                                <Row> Development </Row>
                                <Row> Hosting </Row>  
                            </small>
                        </Col>
                    </Col>
                    {/* <Col className="col-sm-6 col-md-3 item">
                    <Row><h3>About</h3></Row>
                        <Col>
                            <small>
                                <Row> Company </Row>
                                <Row> Team </Row>
                                <Row> Careers </Row>
                            </small>
                        </Col>
                    </Col> */}
                    <Col className="col-md-6 item text">
                        <Row><h3>e-Dziennik</h3></Row>
                        <small>
                        <Row><p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p></Row>
                        </small>
                    </Col>
                    <p class="copyright">e-Dziennik © 2022</p>
                </Row>
                
            </Container>
    </footer>
);
}
export default Footer;