import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Table, Col } from "react-bootstrap";
import ValueSelect from "components/ValueSelect";

const Grades = () => {
  const options = [
    { value: "default", text: "Wybierz semestr" },
    { value: "sem1", text: "Semestr 1" },
    { value: "sem2", text: "Semestr 2" },
  ];

  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (event) => {
    console.log(event.target.value);
    alert(event.target.value);
    setSelected(event.target.value);
  };

  return (
    <Container className="Grades justify-content-md-center">
      <Row className="text-center mb-2">
        <h3>Oceny</h3>
      </Row>
      <div>
        <ValueSelect options={options} value={selected} onChange={handleChange}/>
      </div>
      <Row>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>Przedmiot</th>
              <th>Oceny cząstkowe</th>
              <th>Ocena proponowana</th>
              <th>Ocena końcowa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Matematyka</td>
              <td>
                <Row className="row-cols-2 row-cols-lg-6 g-2 g-lg-1">
                  <Col><div class="h-100 w-80 sprawdzian">5</div></Col>
                  <Col><div class="h-100 w-80 aktywnosc">5</div></Col>
                  <Col><div class="h-100 w-80 kartkowka">3+</div></Col>
                  <Col><div class="h-100 w-80 aktywnosc">5</div></Col>
                  <Col><div class="h-100 w-80 kartkowka">3+</div></Col>
                  <Col><div class="h-100 w-80 aktywnosc">5</div></Col>
                </Row>
              </td>
              <td>
              <Row className="row-cols-2 row-cols-lg-6 g-2 g-lg-1">
                  <Col className="col-lg-2 h-100 w-80 propozycja">5</Col>
                </Row>
              </td>
              <td>
              <Row className="row-cols-2 row-cols-lg-6 g-2 g-lg-1">
                  <Col className="col-lg-2 h-100 w-80 koncowa">5</Col>
                </Row>
              </td>
            </tr>
            <tr>
              <td>Przyroda</td>
              <td>
                
              <Row className="row-cols-2 row-cols-lg-6 g-2 g-lg-1">
                  <Col><div class="h-100 w-80 sprawdzian">5</div></Col>
                  <Col><div class="h-100 w-80 aktywnosc">5</div></Col>

                </Row>
                
              </td>
              <td>
              <Row className="row-cols-2 row-cols-lg-6 g-2 g-lg-1">
                  <Col className="col-lg-2 h-100 w-80 propozycja">5</Col>
                </Row>
              </td>
              <td>
              <Row className="row-cols-2 row-cols-lg-6 g-2 g-lg-1">
                  <Col className="col-lg-2 h-100 w-80 koncowa">5</Col>
                </Row>
              </td>
            </tr>
            <tr>
              <td>Wychowanie Fizyczne</td>
              <td>
              <Row className="row-cols-2 row-cols-lg-6 g-2 g-lg-1">
                  <Col><div class="h-100 w-80 sprawdzian">5</div></Col>
                  <Col><div class="h-100 w-80 aktywnosc">5</div></Col>
                  <Col><div class="h-100 w-80 kartkowka">3+</div></Col>
                  <Col><div class="h-100 w-80 aktywnosc">5</div></Col>
                </Row>
              </td>
              <td>
              <Row className="row-cols-2 row-cols-lg-6 g-2 g-lg-1">
                  <Col className="col-lg-2 h-100 w-80 propozycja">5</Col>
                </Row>
              </td>
              <td>
              <Row className="row-cols-2 row-cols-lg-6 g-2 g-lg-1">
                  <Col className="col-lg-2 h-100 w-80 koncowa">5</Col>
                </Row>
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default Grades;
