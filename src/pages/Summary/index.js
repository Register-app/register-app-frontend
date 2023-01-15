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
  const [grades, setGrades] = useState([]);
  const [date, setDate] = useState("2022-01-19"); //domyslna data
  const { user } = useAuth();
  const axios = useAxios();
  const [year, month, day] = date.split('-');
  const date2 = new Date(+year, month-1, day, "01", "00", "00");
  const data = useAdditionalData();
  
  useEffect(() => {
    data();
    getEvents();
    getGrades();
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

  const getGrades = async () => {
    if(checkRoles(user, ["ROLE_STUDENT"])){
    try {
      const response = await axios.get(
        `/api/v1/grades/student/${user.student_id}/date/{date}?date=${date2.toISOString()}`
      );
      setGrades(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }
};

  return (
    <Container className="Summary justify-content-md-center">
      <Row className="text-center mb-2">


        <Col>
          <h4>Dzisiejszy plan</h4>
        </Col>
        <Col>
          <h4>Terminarz</h4>
        </Col>
        <Col>
        {checkRoles(user, ["ROLE_STUDENT"])&&<h4>Ostatnie oceny</h4>}
        {checkRoles(user, ["ROLE_TEACHER"]) &&<h4>Ostatnie wiadomości</h4>}
        </Col>
      </Row>

      <Row>
        <Col className="col-4">
          <div className="p-3 border bg-light text-break">
          {events.map((evt) => evt.schedule_type_id !== 'test' ? (
              
              <Row>{new Date(evt.date).toLocaleTimeString('pl', {hour: '2-digit', minute:'2-digit'})} - {new Date(new Date(evt.date).setMinutes((new Date(evt.date)).getMinutes() + 45)).toLocaleTimeString('pl', {hour: '2-digit', minute:'2-digit'})} {evt.subject} </Row>
            ): null )}
          </div>
        </Col>
        <Col className="col-4">
          <div className="p-3 border bg-light text-break">
          {events.map((evt) => evt.schedule_type_id !== 'lekcja' ? (
              
              <Row><p><b>[{evt.schedule_type_id}]</b> {new Date(evt.date).toLocaleTimeString('pl', {hour: '2-digit', minute:'2-digit'})}  {evt.subject} </p></Row>
            ): null )}
        </div>
        </Col>
        <Col className="col-4">
          <div className="p-3 border bg-light text-break">
          {checkRoles(user, ["ROLE_STUDENT"]) && grades.map((grd) => (<Row><p><b>{grd.subject}:</b> {grd.value_text} ({grd.type_text})</p> </Row>))}
          {checkRoles(user, ["ROLE_TEACHER"]) && "Już wkrótce"}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Summary;
