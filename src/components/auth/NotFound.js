import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, [navigate]);
  return (
    <Container className="NotFound">
      <Row className="justify-content-center mt-5">
        <h1>404</h1>
      </Row>
      <Row className="justify-content-center">
        <h2>Strona nie istnieje.</h2>
      </Row>
      <Row className="justify-content-center">
        <h3>Zostaniesz przekierowany do strony głównej.</h3>
      </Row>
    </Container>
  );
};

export default NotFound;
