import ValueSelect from "components/form/valueSelect";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Attendances = () => {
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
    <Container className="Frequency justify-content-md-center">
      <Row className="text-center">
        {/* Ten div niżej to jest odstep od gornej belki */}
        <div class="row gy-3">
          <h3>Frekwencja</h3>
          <br />
          <ValueSelect
            options={options}
            value={selected}
            onChange={handleChange}
          />
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
            obecny <br />
            <b>Historia</b>
            <br />
            obecny <br />
            <b>Przyroda</b>
            <br />
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

export default Attendances;
