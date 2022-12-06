import useAuth from "hooks/useAuth";
import myAxios from "lib/axios";
import { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = "/api/auth/login";

const LoginForm = () => {
  const { setUser } = useAuth();

  const navigate = useNavigate();
  const homePage = "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await myAxios.post(LOGIN_URL, { email, password });
      setUser(response?.data);
      localStorage.setItem("user", JSON.stringify(response?.data));
      setEmail("");
      setPassword("");
      navigate(homePage, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setErrMsg("Brak odpowiedzi ze strony serwera.");
      } else if (error.response?.status === 400) {
        setErrMsg("Niepoprawny email lub hasło.");
      } else if (error.response?.status === 401) {
        setErrMsg("Brak autoryzacji.");
      } else if (error.response?.status === 404) {
        setErrMsg("Użytkownik o podanym emailu nie istnieje.");
      } else {
        setErrMsg("Błąd logowania.");
      }
    }
  };

  return (
    <Container className="Login col-4 justify-content-center text-center">
      <Row className="mt-5">
        <Form className="justify-content-center" onSubmit={handleSubmit}>
          {errMsg && <Alert variant="danger">{errMsg}</Alert>}
          <h1 className="h3 mb-3 fw-normal">Zaloguj się</h1>
          <FormGroup className="mb-3 form-floating">
            <FormControl
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FormLabel>Adres Email</FormLabel>
          </FormGroup>
          <FormGroup className="mb-3 form-floating">
            <FormControl
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FormLabel>Hasło</FormLabel>
          </FormGroup>
          <Col className="form-floating"></Col>
          <Button variant="primary" type="submit" className="col-6">
            Zaloguj
          </Button>
        </Form>
      </Row>
    </Container>
  );
};
export default LoginForm;
