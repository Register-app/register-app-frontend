import "bootstrap/dist/css/bootstrap.min.css";
import "./style/custom.css";
import {Container, Row, Col} from 'react-bootstrap';
import Login from "./Login";

function Logout() {
    return(
      <Container className="justify-content-md-center min-vh-100">
        <div class="mt-5 col-md-12">
      <Row>
        <center>
        <Col className="col-md-4">
        <h1 class="h3 mb-3 fw-normal">Zostałeś wylogowany</h1>
      </Col>
      </center>

      <Login/>

    </Row>
    </div>
      </Container>
);
}
export default Logout;