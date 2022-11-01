import { useState } from "react";
import "./style/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Form } from "react-bootstrap";
import ValueSelect from "./ValueSelect";

const NewMessage = () => {
  const options = [
    { value: "default", text: "Wybierz odbiorce" },
    { value: "nauczyciel1", text: "Nauczyciel 1" },
    { value: "nauczyciel2", text: "Nauczyciel 2" },
  ];

  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (event) => {
    console.log(event.target.value);
    alert(event.target.value);
    setSelected(event.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const element = e.target;
    alert("Nacisnales: " + element.id);
  };

  return (
    <Container className="justify-content-md-center">
      <Row className="text-center">
        <div class="row gy-3">
          <h3>Nowa wiadomość</h3>
          <br />
        </div>
      </Row>
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              <b>Odbiorca</b>{" "}
            </Form.Label>
            <ValueSelect options={options} value={selected} onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>
              <b>Treść</b>
            </Form.Label>
            <Form.Control as="textarea" rows={5} />
          </Form.Group>
          <button
            type="button"
            onClick={handleClick}
            id="wyslijWiadomoscButton"
            class="btn btn-secondary"
          >
            Wyślij
          </button>
        </Form>
      </Row>
    </Container>
  );
};

export default NewMessage;
