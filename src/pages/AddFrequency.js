import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import DatePicker from "components/DatePicker";
import ValueSelect from "components/ValueSelect";
import "./style/Frequency.css";

const AddFrequency = () => {
  const options = [
    { value: "default", text: "Klasa domyślna" },
    { value: "sem1", text: "Semestr 1" },
    { value: "sem2", text: "Semestr 2" },
  ];
  const frekwencjaOptions = [
    { value: "brak", text: "brak" },
    { value: "obecny", text: "obecny" },
    { value: "nieobecny", text: "nieobecny" },
  ];

  const [selected, setSelected] = useState(options[0].value);
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA'));
  // console.log("Data: "+ new Date().toLocaleDateString('en-CA'));

  const handleChange = (event) => {
    console.log(event.target.value);
    alert(event.target.value);
    setSelected(event.target.value);
  };

  const handleChangeFrequency = (event) => {
    console.log(event.target.value);
    if(event.target.value==='obecny'){
      document.getElementById(event.target.id).style.backgroundColor = "blue";
    }
    if(event.target.value==='nieobecny'){
      document.getElementById(event.target.id).style.backgroundColor = "red";
    }
    alert(event.target.value);
    setSelected(event.target.value);
  };

  const handleChangeDate = (event) => {
    console.log(event.target.value);
    alert(event.target.value);
    setSelectedDate(event.target.value);
  };

  
  return (
    <Container className="Frequency justify-content-md-center">
      <Row className="justify-content-md-center text-center">
        <div class="row gy-3">
          <h3 id='test'>Dodaj frekwencję</h3>
          
          <Container className="row gy-4 justify-content-md-center">
            <Row>
              <Col>
              Wybierz klasę:
              <ValueSelect options={options} value={selected} onChange={handleChange}/>
                  </Col>
              <Col>
              Wybierz datę:
                <DatePicker selectedValue={selectedDate} onChange={handleChangeDate}/>
              </Col>
            </Row>
            <Row>
              <Container className="row gy-2 justify-content-md-center">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Numer</th>
                      <th>Imię i nazwisko</th>
                      <th>Frekwencja</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mark</td>
                      <td><ValueSelect id='1' options={frekwencjaOptions} value={selected} onChange={handleChangeFrequency}/></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jacob</td>
                      <td><ValueSelect id='2' options={frekwencjaOptions} value={selected} onChange={handleChangeFrequency}/></td>

                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Larry the Bird</td>
                      <td><ValueSelect id='3' options={frekwencjaOptions} value={selected} onChange={handleChangeFrequency}/></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Mark</td>
                      <td><ValueSelect id='4' options={frekwencjaOptions} value={selected} onChange={handleChangeFrequency}/></td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Jacob</td>
                      <td><ValueSelect id='5' options={frekwencjaOptions} value={selected} onChange={handleChangeFrequency}/></td>

                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Larry the Bird</td>
                      <td><ValueSelect id='test' options={frekwencjaOptions} value={selected} onChange={handleChange}/></td>
                    </tr>
                  </tbody>
                </Table>
                <Row>
                  <Col><Button variant="outline-success" value='zapisz' onClick={handleChange}>Zapisz</Button></Col>
                  <Col><Button variant="outline-danger" value='wyczysc' onClick={handleChange}>Wyczyść</Button></Col>
                </Row>
                <div class="mt-3"></div>
                </Container>
            </Row>
          </Container>
      

      
        </div>
      </Row>
      
    </Container>
  );
};

export default AddFrequency;
