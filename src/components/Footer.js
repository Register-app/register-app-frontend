import "bootstrap/dist/css/bootstrap.min.css";
import "./style/custom.css";
import {Container, Row, Col } from 'react-bootstrap';

function Footer() {
    return(
      <footer className="footer-dark fixed-bottom">
            <Container>

                <Row>
                    <div class="col-sm-6 col-md-3 item">
                        <h3>Services</h3>
                        <ul>
                            <li> Web design </li>
                            <li> Development </li>
                            <li> Hosting </li>
                        </ul>
                    </div>
                    <div class="col-sm-6 col-md-3 item">
                        <h3>About</h3>
                        <ul>
                            <li> Company </li>
                            <li> Team </li>
                            <li> Careers </li>
                        </ul>
                    </div>
                    <div class="col-md-6 item text">
                        <h3>Company Name</h3>
                        <p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>
                    </div>
                    <p class="copyright">Company Name © 2018</p>
                </Row>
                
            </Container>
    </footer>
);
}
export default Footer;