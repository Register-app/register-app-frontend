import SelectClass from "components/form/SelectClass";
import SelectSubject from "components/form/SelectSubject";
import useAuth from "hooks/useAuth";
import useAxios from "hooks/useAxios";
import useGrades from "hooks/useGrades";
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
import "pages/Grades/TopBar.css";

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
    gradeType,
    setGradeType,
    gradeWeight,
    setGradeWeight,
    gradeComment,
    setGradeComment,
    setStudents,
    grade,
    student,
    gradeTypes,
    setGradeTypes,
  } = useGrades();

  const { user } = useAuth();
  const axios = useAxios();

  useEffect(() => {
    getClasses();
    getGradeTypes();
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

  const getGradeTypes = async () => {
    try {
      const response = await axios.get(`/api/v1/grade-types`);
      setGradeTypes(response.data);
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

  // const getGrades = async () => {
  //   try {
  //     const response = await axios.get(
  //       `/api/v1/students/class/${selectedClass.class_id}`
  //     );
  //     setGrades(response.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleSetGradeType = (e) => {
    if (e.target.value !== "-") {
      setGradeType(JSON.parse(e.target.value));
    } else {
      setGradeType(null);
    }
  };

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
              <FormGroup className="form-floating">
                <FormSelect
                  className={gradeType?.value}
                  value={JSON.stringify(gradeType)}
                  onChange={(e) => handleSetGradeType(e)}
                  disabled={!subject && (!grade || !student)}
                >
                  <option>-</option>
                  {gradeTypes
                    .filter(
                      (gt) => gt.value !== "proposed" && gt.value !== "final"
                    )
                    .map((gt) => (
                      <option
                        key={gt.grade_type_id}
                        value={JSON.stringify(gt)}
                        className={gt.value}
                      >
                        {gt.text}
                      </option>
                    ))}
                </FormSelect>
                <FormLabel>Kategoria oceny:</FormLabel>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="form-floating">
                <FormControl
                  type="number"
                  value={gradeWeight}
                  onChange={(e) => setGradeWeight(parseInt(e.target.value))}
                  disabled={!subject && (!grade || !student)}
                />
                <FormLabel>Waga oceny:</FormLabel>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup className="form-floating">
                <FormControl
                  type="text"
                  value={gradeComment}
                  onChange={(e) => setGradeComment(e.target.value)}
                  disabled={!subject && (!grade || !student)}
                />
                <FormLabel>Komentarz do oceny:</FormLabel>
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default TopBar;
