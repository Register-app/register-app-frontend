import SelectClass from "components/form/SelectClass";
import SelectSubject from "components/form/SelectSubject";
import useAuth from "hooks/useAuth";
import useAxios from "hooks/useAxios";
import useAttendances from "hooks/useAttendances";
import React, { useEffect } from "react";
import {
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import "pages/Attendances/TopBar.css";

const TopBar = () => {
  const {
    classes,
    setClasses,
    setSelectedClass,
    selectedClass,
    subjects,
    setSubjects,
    subject,
    setSubject,
    setStudents,
    attendance,
    setAttendances,
    student,
    setAttendanceTypes,
    setAttendanceType

  } = useAttendances();

  const { user } = useAuth();
  const axios = useAxios();

  useEffect(() => {
    getClasses();
    getAttendanceTypes();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      getSubjects();
      getStudents();
    } else {
      setSubjects([]);
      setStudents([]);
    }
  }, [selectedClass]);

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

  const getAttendanceTypes = async () => {
    try {
      const response = await axios.get(`/api/v1/attendancetype`);
      setAttendanceTypes(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getSubjects = async () => {
    try {
      const response = await axios.get(
        `/api/v1/subjects/teacher/${user.teacher_id}/class/${selectedClass.class_id}`
      );
      setSubjects(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getStudents = async () => {
    try {
      const response = await axios.get(
        `/api/v1/students/class/${selectedClass.class_id}`
      );
      setStudents(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getAttendances = async () => {
    try {
      const response = await axios.get(
        `/api/v1/attendance/class/${selectedClass.class_id}/date/{date}?date=2022-01-19T08%3A00%3A00`
      );
      setAttendances(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetAttendanceType = (e) => {
    if (e.target.value !== "-") {
      setAttendanceType(JSON.parse(e.target.value));
    } else {
      setAttendanceType(null);
    }
  };

  return (
    <Container className="TopBar">
      <Row>
        <Col md={5}>
              <SelectClass
                classes={classes}
                setSelectedClass={setSelectedClass}
              />
         </Col>
         <Col md={5}>
              <SelectSubject
                subjects={subjects}
                setSubject={setSubject}
                isDisabled={!selectedClass}
              />
        </Col>
        </Row>
    </Container>
  );
};

export default TopBar;
