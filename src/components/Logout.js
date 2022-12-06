import "bootstrap/dist/css/bootstrap.min.css";
import "./style/custom.css";
import { Container, Row, Col } from "react-bootstrap";
import Login from "./Login";

const Logout = () => {
  localStorage.clear();
  return (
    <Container className="justify-content-md-center">
      <div class="mt-5 col-md-12">
        <Row>
          <center>
            <Col className="col-md-4">
              <h1 class="h3 mb-3 fw-normal">Zostałeś wylogowany</h1>
            </Col>
          </center>

          {/* <Login /> */}
        </Row>
      </div>
      {/* pusty div do zwiekszenia odstepu od footera */}
      <div class="mt-5 col-md-12"></div>
    </Container>
  );
};
export default Logout;
