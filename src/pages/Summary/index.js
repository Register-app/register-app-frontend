import useAdditionalData from "hooks/useAdditionalData";
import useAuth from "hooks/useAuth";
import useAxios from "hooks/useAxios";
import "pages/Summary/Summary.css";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { checkRoles } from "utils/checkRoles";

const Summary = () => {

  const [events, setEvents] = useState([]);
  const [date, setDate] = useState("2022-01-19"); //domyslna data
  const { user } = useAuth();
  const axios = useAxios();
  const [year, month, day] = date.split('-');
  const date2 = new Date(+year, month-1, day, "01", "00", "00");
  const data = useAdditionalData();
  
  useEffect(() => {
    data();
    getEvents();
  }, []);

  const getEvents = async () => {
    if(checkRoles(user, ["ROLE_TEACHER"])){
    try {
      const response = await axios.get(
        `/api/v1/schedule/teacher/${user.teacher_id}/date/{date}?date=${date2.toISOString()}`
      );
      setEvents(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }
  else{
    try {
      const response = await axios.get(
        `/api/v1/schedule/student/${user.student_id}/date/{date}?date=${date2.toISOString()}`
      );
      setEvents(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }};

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

      <Row>
        <Col className="col-4">
          <div className="p-3 border bg-light text-break">
          {events.map((evt) => evt.schedule_type_id !== 'test' ? (
              
              <Row>{new Date(evt.date).toLocaleTimeString('pl', {hour: '2-digit', minute:'2-digit'})} {evt.schedule_type_id} {evt.subject} </Row>
            ): null )}
          </div>
        </Col>
        <Col className="col-4">
          <div className="p-3 border bg-light text-break">
          {events.map((evt) => evt.schedule_type_id !== 'lekcja' ? (
              
              <Row>{new Date(evt.date).toLocaleTimeString('pl', {hour: '2-digit', minute:'2-digit'})} {evt.schedule_type_id} {evt.subject} </Row>
            ): null )}
        </div>
        </Col>
        <Col className="col-4">
          <div className="p-3 border bg-light text-break">
            Już wkrótce
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Summary;
