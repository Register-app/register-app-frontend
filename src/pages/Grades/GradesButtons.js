import { useState } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  FormSelect,
  Row,
} from "react-bootstrap";
import "pages/Grades/GradesButtons.css";
import ClassSelect from "components/form/ClassSelect";
import { useEffect } from "react";
import useGrades from "hooks/useGrades";

const gradeValues = [
  { value: 5.75, text: "6-" },
  { value: 6, text: "6" },
  { value: 0, text: "+" },
  { value: 4.75, text: "5-" },
  { value: 5, text: "5" },
  { value: 5.5, text: "5+" },
  { value: 3.75, text: "4-" },
  { value: 4, text: "4" },
  { value: 4.5, text: "4+" },
  { value: 2.75, text: "3-" },
  { value: 3, text: "3" },
  { value: 3.5, text: "3+" },
  { value: 1.75, text: "2-" },
  { value: 2, text: "2" },
  { value: 2.5, text: "2+" },
  { value: 0, text: "-" },
  { value: 1, text: "1" },
  { value: 1.5, text: "1+" },
];

const GradesButtons = () => {
  const {
    student,
    setStudent,
    grade,
    setGrade,
    grades,
    setGrades,
    students,
    setStudents,
    classes,
    setClasses,
    selectedClass,
    setSelectedClass,
    gradeWeight,
    setGradeWeight,
    gradeCategory,
    setGradeCategory,
    subject,
    setSubject,
    gradeValue,
    setGradeValue,
    gradeId,
    setGradeId,
    studentId,
    setStudentId,
    classId,
    setClassId,
    studentName,
    setStudentName,
    studentSecondName,
    setStudentSecondName,
    className,
    setClassName,
    gradeComment,
    setGradeComment,
  } = useGrades();

  const [tempId, setTempId] = useState(100);

  useEffect(() => {
    setClasses([
      { class_id: "1", name: "VII A" },
      { class_id: "2", name: "VI B" },
      { class_id: "3", name: "IV C" },
    ]);
  }, []);

  const handleAddGrade = (grd) => {
    if (grade) {
      const newGrades = grades.map((g) => {
        if (g.grade_id === grade.grade_id) {
          return {
            ...g,
            text: grd.text,
            category: gradeCategory,
            value: grd.value,
            weight: gradeWeight,
            comment: gradeComment,
          };
        }
        return g;
      });
      setGrades(newGrades);
    } else {
      const newGrade = {
        student_id: student.student_id,
        grade_id: tempId,
        category: gradeCategory,
        text: grd.text,
        value: grd.value,
        weight: gradeWeight,
        comment: gradeComment,
      };
      setGrades((prevArray) => [...prevArray, newGrade]);
      setTempId(tempId + 1);
      setStudent(students[students.indexOf(student) + 1]);
    }
  };

  const handleDeleteGrade = (grd) => {
    const newGrades = grades.filter((g) => g.grade_id !== grd.grade_id);
    setGrades(newGrades);
    setGrade(null);
  };

  return (
    <>
      <Container className="GradesButtons border">
        <Row className="mb-2 justify-content-center">
          <Col>
            Klasa:
            <ClassSelect
              classes={classes}
              setSelectedClass={setSelectedClass}
            />
          </Col>
          <Col>
            Kategoria:
            <FormSelect
              className={gradeCategory}
              value={gradeCategory}
              onChange={(e) => setGradeCategory(e.target.value)}
            >
              <option value="">Wybierz kategorię</option>
              <option className="Sprawdzian" value="Sprawdzian">
                Sprawdzian
              </option>
              <option className="Kartkówka" value="Kartkówka">
                Kartkówka
              </option>
              <option className="Aktywność" value="Aktywność">
                Aktywność
              </option>
            </FormSelect>
          </Col>
        </Row>
        <Row className="mb-2 justify-content-center">
          <Col>
            Waga:
            <FormControl
              type="number"
              value={gradeWeight}
              defaultValue={1}
              onChange={(e) => setGradeWeight(parseInt(e.target.value))}
            />
          </Col>
          <Col>
            Komentarz:
            <FormControl
              type="text"
              value={gradeComment}
              onChange={(e) => setGradeComment(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center" fluid>
          <div className="btn-container">
            {gradeValues.map((grd) => (
              <Button
                variant="outline-dark"
                className="border btn-custom"
                disabled={
                  (gradeCategory == "" || !selectedClass || !student) && !grade
                }
                onClick={() => handleAddGrade(grd)}
              >
                {grd.text}
              </Button>
            ))}
          </div>
        </Row>

        <Row className="d-flex justify-content-center mt-2" fluid>
          <Button
            variant="outline-dark"
            className="btn border"
            disabled={!grade}
            onClick={() => handleDeleteGrade(grade)}
          >
            Usuń ocenę
          </Button>
        </Row>
      </Container>
    </>
  );
};

export default GradesButtons;
