import { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import "pages/Grades/GradesButtons.css";
import { useEffect } from "react";
import useGrades from "hooks/useGrades";

const GradesButtons = () => {
  const {
    student,
    setStudent,
    grade,
    setGrade,
    grades,
    setGrades,
    students,
    selectedClass,
    gradeWeight,
    gradeType,
    gradeValues,
    setGradeValues,
    gradeComment,
  } = useGrades();

  const [tempId, setTempId] = useState(100);

  useEffect(() => {
    setGradeValues([
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
    ]);
  }, []);

  const handleAddGrade = (grd) => {
    if (grade) {
      const newGrades = grades.map((g) => {
        if (g.grade_id === grade.grade_id) {
          return {
            ...g,
            text: grd.text,
            type: gradeType.value,
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
        type: gradeType.value,
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
      <Container className="GradesButtons">
        <Row className="d-flex justify-content-center">
          <div className="btn-container">
            {gradeValues.map((grd, idx) => (
              <Button
                key={idx}
                variant="outline-dark"
                className="border btn-custom"
                disabled={(!gradeType || !selectedClass || !student) && !grade}
                onClick={() => handleAddGrade(grd)}
              >
                {grd.text}
              </Button>
            ))}
          </div>
        </Row>

        <Row className="d-flex justify-content-center mt-2">
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
