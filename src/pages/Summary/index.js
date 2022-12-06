import useAdditionalData from "hooks/useAdditionalData";
import useAuth from "hooks/useAuth";
import useAxios from "hooks/useAxios";
import "pages/Summary/Summary.css";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Summary = () => {
  const data = useAdditionalData();
  useEffect(() => {
    data();
  }, []);


  return (
    <Container className="Summary justify-content-md-center">
      <Row className="text-center mb-2">


        {/* Konfiguracja dla nauczyciela */}
        <Col>
          <h4>Dzisiejszy plan</h4>
        </Col>
        <Col>
          <h4>Terminarz</h4>
        </Col>
        <Col>
          <h4>Ostatnie wiadomości</h4>
        </Col>
      </Row>
      {/* Widok ucznia/rodzica(4 kolumny)
        <Row>
          <Col className="col-3"><div className="p-3 border bg-light text-break">Tutaj jakiś plan lekcji blabla<br/>blablaasdfsdfasdfasdfasdfasdfsdddddddddddddddddddddddddddddddddddddddddddddd</div></Col>
          <Col className="col-3"><div className="p-3 border bg-light text-break">Tutaj ostatnie oceny blabla<br/>blablasadfasdfasdfasdfasdfasdf</div></Col>
          <Col className="col-3"><div className="p-3 border bg-light text-break">Tutaj jakiś terminarz blabla<br/>blablasadfasdfasdfasdfasdf</div></Col>
          <Col className="col-3 md-4"><div className="p-3 border bg-light text-break">Tutaj jakies ostatnie wiadomości blablafgfgddfsdfsdfdfsadfsadfsdafsadfsadf<br/>blablasadfsadfsadfasdfsdfsdff</div></Col>
        </Row> */}

      <Row>
        {/* Tutaj trzeba bedzie roznicowac widok per uzytkownika, bo nauczyciel ma tylko 3 kolumny, ponizej konfiguracja dla nauczyciela */}
        <Col className="col-4">
          <div className="p-3 border bg-light text-break">
            Tutaj jakiś plan lekcji blabla
            <br />
            blablaasdfsdfasdfasdfasdfasdfsdddddddddddddddddddddddddddddddddddddddddddddd
          </div>
        </Col>
        <Col className="col-4">
          <div className="p-3 border bg-light text-break">
            Tutaj ostatnie oceny blabla
            <br />
            blablasadfasdfasdfasdfasdfasdf
          </div>
        </Col>
        <Col className="col-4">
          <div className="p-3 border bg-light text-break">
            Tutaj jakiś terminarz blabla
            <br />
            blablasadfasdfasdfasdfasdf
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Summary;
