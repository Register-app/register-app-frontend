import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useTimetable from "hooks/useTimetable";
import useAuth from "hooks/useAuth";
import useAxios from "hooks/useAxios";
import { useState } from "react";

const Timetable = () => {

  const [events, setEvents] = useState([]);
  const { user } = useAuth();
  const axios = useAxios();


  useEffect(() => {
    getEvents();
  }, []);
  
  const getEvents = async () => {
    try {
      const response = await axios.get(
        `/api/v1/schedule/class/1/date/{date}?date=2022-01-19T08%3A00%3A00`
        //`/api/v1/classes/teacher/${user.teacher_id}`
      );
      setEvents(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <Container className="TimeTable border">
        {events?.length ? (
          <>
            <Row>
              <Col md={1} className="border text-center">
                <strong>Numer</strong>
              </Col>
              <Col md={2} className="border text-center">
                <strong>Rodzaj wydarzenia </strong>
              </Col>
              <Col className="border text-center">
                <strong>Przedmiot</strong>
              </Col>
              <Col md={2} className="border">
                <strong>Data</strong>
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
                  godzina
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
