import "./style/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Row, Col} from 'react-bootstrap';


const handleClick = (e) => {
  e.preventDefault();
  const element = e.target;
  alert("Nacisnales: "+element.id);
}


function ButtonRow() {
  return (
      <Row>
        <div id='przyciski' class="row gy-4"> 
          <Col><button type="button" onClick={handleClick} id='planButton' class="btn btn-primary">Plan zajęć</button></Col>
          <Col><button type="button" onClick={handleClick} id='ocenyButton' class="btn btn-danger">Oceny</button></Col>
          <Col><button type="button" onClick={handleClick} id='terminarzButton' class="btn btn-success">Terminarz</button></Col>
          <Col><button type="button" onClick={handleClick} id='wiadomosciButton' class="btn btn-warning">Wiadomości</button></Col>
          <Col><button type="button" onClick={handleClick} id='frekwencjaButton' class="btn btn-info">Frekwencja</button></Col>
        </div>
      </Row>
     
  );
}

export default ButtonRow;
