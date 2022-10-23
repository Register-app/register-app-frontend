import "bootstrap/dist/css/bootstrap.min.css";
import "./style/custom.css";
import {Container, Row, Col, Form} from 'react-bootstrap';

function Login() {
    return(
      
      <Container className="justify-content-md-center min-vh-100">
      <Row>
        <center>
        <Col className="col-md-4">
      <Form>
      
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
    
        <Col className="form-floating">
          <input type="email" class="form-control" id="floatinginput" placeholder="name@example.com"></input>
          <label for="floatinginput">Email address</label>
        </Col>
        <Col className="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password"></input>
          <label for="floatingPassword">Password</label>
        </Col>
        <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
      </Form>
      </Col>
      </center>
    </Row>
      </Container>
);
}
export default Login;