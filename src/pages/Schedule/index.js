import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Schedule = () => {
  const options = [
    { value: "default", text: "Wybierz semestr" },
    { value: "sem1", text: "Semestr 1" },
    { value: "sem2", text: "Semestr 2" },
  ];

  //   //przykladowe dane w formie jsona
  //   const dane = [
  //     {startTime: 'default', endTime: 'default', subject: 'Matemtyka', day: "Poniedziałek"},
  //     {startTime: 'sem1', endTime: 'default', subject: 'Przyroda', day: "Wtorek"},
  //     {startTime: 'sem2', endTime: 'default', subject: 'Semestr 2', day: "Środa"},
  //     {startTime: 'sem2', endTime: 'default', subject: 'Semestr 2', day: "Czwartek"},
  //     {startTime: 'sem2', endTime: 'default', subject: 'Semestr 2', day: "Piątek"}
  //   ];
  //   const dniTygodnia = []
  //   // const plan = []
  //   // var dzien = 0;

  //  dane.forEach((data) => {
  //     dniTygodnia.push(<Col><h4>{data.day}</h4></Col>)
  //   })

  //   dane.forEach((data) => {
  //     plan.push(<Col><div class="p-3 border bg-light text-break">{dane[dzien].startTime} - {dane[dzien].endTime} <br/><b>dane[dzien].subject</b><br/></div></Col>)
  //   })
  // var count = Object.keys(dane).length;
  // console.log(dane[2].day);

  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (event) => {
    console.log(event.target.value);
    alert(event.target.value);
    setSelected(event.target.value);
  };
  return (
    <Container className="LessonPlan justify-content-md-center">
      <Row className="text-center mb-2">
        {/* Ten div niżej to jest odstep od gornej belki */}
        <h3>Plan zajęć</h3>
        <br />
        <select
          class="form-select form-select-xs mb-3"
          aria-label=".form-select-lg example"
          value={selected}
          onChange={handleChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
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
      </Row>

      <Row>
        <Col>
          <div class="p-3 border bg-light text-break">
            08:00 - 8:45 <br />
            <b>Matma</b>
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

export default Schedule;
