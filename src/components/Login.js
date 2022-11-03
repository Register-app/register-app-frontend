import { Container, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import myAxios from "lib/axios";
import useAuth from "hooks/useAuth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/custom.css";

const LOGIN_URL = "/auth/login";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await myAxios.post(LOGIN_URL, { email, password });
      console.log(response?.data);
      setAuth(response?.data);
      localStorage.setItem("user", JSON.stringify(response?.data));
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        console.error("Brak odpowiedzi ze strony serwera");
      } else if (error.response?.status === 400) {
        console.error("Niepodany email lub hasło");
      } else if (error.response?.status === 401) {
        console.error("Brak autoryzacji");
      } else {
        console.error("Błąd logowania");
      }
    }
  };

  return (
    <Container className="Login justify-content-md-center">
      <div class="mt-5 col-md-12">
        <Row>
          <center>
            <Col className="col-md-4">
              <Form onSubmit={handleSubmit}>
                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                <Col className="form-floating">
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="name@example.com"
                    required
                  />
                  <label htmlFor="email">Adres Email</label>
                </Col>
                <Col className="form-floating">
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                  <label htmlFor="password">Hasło</label>
                </Col>
                <button class="w-100 btn btn-lg btn-primary">Zaloguj</button>
              </Form>
            </Col>
          </center>
        </Row>
      </div>
    </Container>
  );
};
export default Login;
