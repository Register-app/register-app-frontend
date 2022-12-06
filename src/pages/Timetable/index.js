import ValueSelect from "components/form/valueSelect";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Timetable = () => {
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
    <Container className="Timetable justify-content-md-center">
      <Row className="text-center">
        {/* Ten div niżej to jest odstep od gornej belki */}
        <div class="row gy-3">
          <h3>Terminarz</h3>
          <br />
          <ValueSelect
            options={options}
            value={selected}
            onChange={handleChange}
          />
          {/* {dniTygodnia} */}
          <Col>
            <h4>Poniedziałek</h4>
          </Col>
          <Col>
            <h4>Wtorek</h4>
          </Col>
          <Col>
            <h4>Środa</h4>
          </Col>
          <Col>
            <h4>Czwartek</h4>
          </Col>
          <Col>
            <h4>Piątek</h4>
          </Col>
        </div>
      </Row>

      <Row>
        <Col>
          <div class="p-3 border bg-light text-break">
            08:00 - 8:45 <br />
            <b>Matma</b>
            <br />
            Sprawdzian
          </div>
        </Col>
        <Col>
          <div class="p-3 border bg-light text-break">
            Matma
            <br />
            Przyroda
            <br />
            Biologia
            <br />
            Historia
          </div>
        </Col>
        <Col>
          <div class="p-3 border bg-light text-break">
            Matma
            <br />
            Przyroda
            <br />
            Biologia
          </div>
        </Col>
        <Col>
          <div class="p-3 border bg-light text-break">
            Matma
            <br />
            Przyroda
            <br />
            Biologia
          </div>
        </Col>
        <Col>
          <div class="p-3 border bg-light text-break">
            Matma
            <br />
            Przyroda
            <br />
            Biologia
            <br />
            Matma
            <br />
            Przyroda
            <br />
            Biologia
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Timetable;
