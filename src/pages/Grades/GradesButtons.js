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
    weight,
    setWeight,
    category,
    setCategory,
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
            category: category,
          };
        }
        return g;
      });
      setGrades(newGrades);
    } else {
      const newGrade = {
        student_id: student.student_id,
        grade_id: tempId,
        subject: "Przyroda",
        category: category,
        text: grd.text,
      };
      setGrades((prevArray) => [...prevArray, newGrade]);
      setTempId(tempId + 1);
    }
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <Container className="GradesButtons">
        <Row className="mb-2 justify-content-center">
          Wybierz klasę:
          <ClassSelect classes={classes} setSelectedClass={setSelectedClass} />
        </Row>
        <Row className="mb-2 justify-content-center">
          Wybierz kategorię:
          <FormSelect onChange={(e) => handleChangeCategory(e)}>
            <option value="">Wybierz kategorię</option>
            <option value="Sprawdzian">Sprawdzian</option>
            <option value="Kartkówka">Kartkówka</option>
            <option value="Aktywność">Aktywność</option>
            <option value="Propozycja">Propozycja</option>
            <option value="Końcowa">Końcowa</option>
          </FormSelect>
        </Row>
        <Row className="d-flex justify-content-center" fluid>
          <div className="btn-container">
            {gradeValues.map((grd) => (
              <Button
                variant="outline-dark"
                className="btn border"
                disabled={
                  (category == "" || !selectedClass || !student) && !grade
                }
                onClick={() => handleAddGrade(grd)}
              >
                {grd.text}
              </Button>
            ))}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default GradesButtons;
