import axios from "lib/axios";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const PWD_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
const REGISTER_URL = "/registration";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  //const navigate = useNavigate();
  //const [signupUser, { isLoading, error }] = useSignupUserMutation();

  const handleSignup = async (e) => {
    e.preventDefault();
    //navigate("/");
    try {
      const response = await axios.post(REGISTER_URL, {
        name,
        second_name: secondName,
        email,
        password,
      });
      console.log(response.data);
    } catch (error) {
      if (!error?.response) {
        console.log("Nie wiem ok");
      } else {
        console.log(error.response?.status);
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col
          md={5}
          className="d-flex align-items-center justify-content-center"
        >
          <Form className="signup__form">
            <h1 className="text-center">Rejestracja</h1>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Imię:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Imię"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <Form.Text className="text-muted">Przykład: Konrad</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSecondName">
              <Form.Label>Nazwisko:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nazwisko"
                required
                onChange={(e) => setSecondName(e.target.value)}
                value={secondName}
              />
              <Form.Text className="text-muted">Przykład: Kalman</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Adres email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Adres email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Form.Text className="text-muted">
                Przykład: test@example.com
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                type="password"
                placeholder="Hasło"
                required
                title="Hasło musi zawierać przynajmniej jedną liczbę, jedną dużą literę i przynajmniej jedną małą literę i mieć minimum 8 znaków"
                pattern={PWD_REGEX}
                minlength="8"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            <Button variant="primary" onClick={(e) => handleSignup(e)}>
              Zarejestruj
            </Button>
          </Form>
        </Col>
        <Col md={7} className="signup__bg"></Col>
      </Row>
    </Container>
  );
};

export default Register;
