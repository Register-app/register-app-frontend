import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SelectClass from "components/form/SelectClass";
import DatePicker from "components/form/DatePicker";
import useTimetable from "hooks/useTimetable";
import useAuth from "hooks/useAuth";
import useAxios from "hooks/useAxios";
import { useState } from "react";
import { checkRoles } from "utils/checkRoles";

const Timetable = () => {

  const [events, setEvents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [date, setDate] = useState("2022-01-19"); //domyslna data
  const [selectedClass, setSelectedClass] = useState(null);
  const { user } = useAuth();
  const axios = useAxios();
  const [year, month, day] = date.split('-');
  const date2 = new Date(+year, month-1, day, "01", "00", "00");



  useEffect(() => {
    getClasses();
  }, []);
  

  const getClasses = async () => {
    try {
      const response = await axios.get(
        `/api/v1/classes/teacher/${user.teacher_id}`
      );
      setClasses(response.data);
    } catch (err) {
      console.error(err);
    }
  };



  useEffect(() => {
    if (selectedClass) {
      getEvents();
    } else {
      setEvents([]);
    }
  }, [selectedClass]);

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

  useEffect(() => {
    if (date) {
      getEvents();;
    } else {
      setEvents([]);
    }
  }, [date]);

console.log(date2.toISOString());

  return (
    <>

          <Row className="d-flex mb-2 justify-content-center">
            
          {checkRoles(user, ["ROLE_TEACHER"]) && <Col md={6}><SelectClass classes={classes} setSelectedClass={setSelectedClass} /></Col>}
            <Col md={6}>
            {checkRoles(user, ["ROLE_TEACHER"])&&<DatePicker setSelectedDate={setDate} isDisabled={!selectedClass}></DatePicker>}
            {checkRoles(user, ["ROLE_STUDENT"])&&<DatePicker setSelectedDate={setDate}></DatePicker>}
            </Col>

            
          </Row>

      <Container className="TimeTable border">
        {events?.length ? (
          <>
            <Row>
              <Col md={1} className="border text-center">
                <strong>LP</strong>
              </Col>
              <Col md={2} className="border text-center">
                <strong>Rodzaj wydarzenia </strong>
              </Col>
              <Col className="border text-center">
                <strong>Przedmiot</strong>
              </Col>
              <Col md={2} className="border">
                <strong>Godzina</strong>
              </Col>
            </Row>
            {events.map((evt, idx) => evt.schedule_type_id !== 'lekcja' ? (
              
              <Row>
                <Col md={1} className="border">
                  {++idx}
                </Col>
                <Col md={2} className="border">
                  {evt.schedule_type_id} 
                </Col>
                <Col className="border">
                  {evt.subject}
                </Col>
                <Col md={2} className="border">
                  {new Date(evt.date).toLocaleTimeString('pl', {hour: '2-digit', minute:'2-digit'})}
                </Col>
              </Row>
            ): null )}
          </>
        ) : (
          <p>Brak wydarzeń</p>
        )}
      </Container>
    </>
  );
};

export default Timetable;
