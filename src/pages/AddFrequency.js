import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import DatePicker from "components/DatePicker";
import ValueSelect from "components/ValueSelect";
import ClassSelect from "components/ClassSelect";
import "./style/Frequency.css";

const AddFrequency = () => {

  //Przykladowe dane
  var classes = [
    { "klasa_id": "1", "klasa": "VII A" },
    { "klasa_id": "2", "klasa": "VI B" },
  ];

  const frekwencjaOptions = [
    { value: "brak", text: "brak" },
    { value: "obecny", text: "obecny" },
    { value: "nieobecny", text: "nieobecny" },
    { value: "spoznienie", text: "spoznienie" },
    { value: "zwolnienie", text: "zwolnienie" },
  ];

  const [selected, setSelected] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA'));
  // console.log("Data: "+ new Date().toLocaleDateString('en-CA'));

  const handleChange = (event) => {
    console.log(event.target.value);
    alert(event.target.value);
    setSelected(event.target.value);
  };

  const handleChangeFrequency = (event) => {
    console.log(event.target.value);
    switch(event.target.value){
      case 'obecny':
        document.getElementById(event.target.id).style.backgroundColor = "green";
        break;
      case 'nieobecny':
        document.getElementById(event.target.id).style.backgroundColor = "red";
        break;
      case 'spoznienie':
        document.getElementById(event.target.id).style.backgroundColor = "orange";
        break;
      case 'zwolnienie':
        document.getElementById(event.target.id).style.backgroundColor = "rgb(131, 177, 236)";
        break;
      default:
        document.getElementById(event.target.id).style.backgroundColor = "white";
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
              <ClassSelect id="klasa" options={classes} value={selected} onChange={handleChange}/>
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
                      <td><ValueSelect id='6' options={frekwencjaOptions} value={selected} onChange={handleChangeFrequency}/></td>
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
