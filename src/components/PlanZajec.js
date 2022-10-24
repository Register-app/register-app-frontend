import {useState} from 'react';
import "./style/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container, Row, Col } from 'react-bootstrap';
// import ButtonRow from "./ButtonRow";


function PlanZajec() {
  const options = [
    {value: 'default', text: 'Wybierz tydzien'},
    {value: 'apple', text: 'Apple 🍏'},
    {value: 'banana', text: 'Banana 🍌'},
    {value: 'kiwi', text: 'Kiwi 🥝'},
  ];
  
  const [selected, setSelected] = useState(options[0].value);
  
  const handleChange = event => {
    console.log(event.target.value);
    alert(event.target.value)
    setSelected(event.target.value);

  };
  return (
    <Container className="justify-content-md-center min-vh-100">
      {/* <ButtonRow/> */}
      
      <Row className="text-center">
      {/* Ten div niżej to jest odstep od gornej belki */}
        <div class="row gy-3"> 
        <h3>Plan zajęć</h3><br/>
        <select class="form-select form-select-xs mb-3" aria-label=".form-select-lg example" value={selected} onChange={handleChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
          <Col><h4>Poniedziałek</h4></Col>
          <Col><h4>Wtorek</h4></Col>
          <Col><h4>Środa</h4></Col>
          <Col><h4>Czwartek</h4></Col>
          <Col><h4>Piątek</h4></Col>
        </div>
      </Row>

        <Row>
          <Col><div class="p-3 border bg-light text-break">Matma<br/>Przyroda<br/>Biologia</div></Col>
          <Col><div class="p-3 border bg-light text-break">Matma<br/>Przyroda<br/>Biologia<br/>Historia</div></Col>
          <Col><div class="p-3 border bg-light text-break">Matma<br/>Przyroda<br/>Biologia</div></Col>
          <Col><div class="p-3 border bg-light text-break">Matma<br/>Przyroda<br/>Biologia</div></Col>
          <Col><div class="p-3 border bg-light text-break">Matma<br/>Przyroda<br/>Biologia<br/>Matma<br/>Przyroda<br/>Biologia</div></Col>

        </Row>
      
  </Container>
  );
}

export default PlanZajec;
