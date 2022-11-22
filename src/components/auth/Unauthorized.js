import { Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Container className="Unauthorized">
      <Row className="justify-content-center mt-5">
        <h1>401</h1>
      </Row>
      <Row className="justify-content-center">
        <h2>Brak autoryzacji.</h2>
      </Row>
      <Row className="justify-content-center">
        <h3>
          Nie masz uprawnień do przeglądania tej strony. <br />
          <Button onClick={goBack}>Wróć</Button>
        </h3>
      </Row>
    </Container>
  );
};

export default Unauthorized;
