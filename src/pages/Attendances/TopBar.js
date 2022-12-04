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

  } = useAttendances();

  const { user } = useAuth();
  const axios = useAxios();

  useEffect(() => {
    getClasses();
    //getGradeTypes();
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

//   const getGradeTypes = async () => {
//     try {
//       const response = await axios.get(`/api/v1/grade-types`);
//       setGradeTypes(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

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

//   const handleSetGradeType = (e) => {
//     if (e.target.value !== "-") {
//       setGradeType(JSON.parse(e.target.value));
//     } else {
//       setGradeType(null);
//     }
//   };

  return (
    <Container className="TopBar">
      <Row>
        <Col md={6}>
          <Row className="d-flex mb-2 justify-content-center">
            <Col>
              <SelectClass
                classes={classes}
                setSelectedClass={setSelectedClass}
              />
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col>
              <SelectSubject
                subjects={subjects}
                setSubject={setSubject}
                isDisabled={!selectedClass}
              />
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <Row className="d-flex mb-2 justify-content-center">
            <Col>
             
            </Col>
            <Col>
              
            </Col>
          </Row>
          <Row>
            <Col>
              
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default TopBar;
