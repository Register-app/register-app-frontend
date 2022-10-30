import {useState} from 'react';
import "./style/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container, Row, Col } from 'react-bootstrap';
// import ButtonRow from "./ButtonRow";


function Terminarz() {
 
  return (
    <Container className="justify-content-md-center min-vh-100">
      {/* <ButtonRow/> */}
      
      <Row className="text-center">
      {/* Ten div niżej to jest odstep od gornej belki */}
        <div class="row gy-3"> 
        <h3>Terminarz</h3><br/>

    </div>
        </Row>
      
  </Container>
  );
}

export default Terminarz;
