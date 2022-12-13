import useAuth from "hooks/useAuth";
import useAxios from "hooks/useAxios";
import useGrades from "hooks/useGrades";
import "pages/Grades/GradesButtons.css";
import { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";

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
    subject,
  } = useGrades();

  const { user } = useAuth();

  const axios = useAxios();

  const getGradeValues = async () => {
    try {
      const response = await axios.get(`/api/v1/grade-values`);
      setGradeValues(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getGradeValues();
  }, []);

  const handleGradeAction = (grd) => {
    if (grade) {
      updateGrade(grd);
    } else {
      addGrade(grd);
    }
  };

  const handleDeleteGrade = (grd) => {
    deleteGrade(grd);
  };

  const addGrade = async (grd) => {
    try {
      const date = new Date();
      const response = await axios.post(`/api/v1/grades/grade`, {
        student_id: student.student_id,
        grade_type_id: gradeType.grade_type_id,
        grade_value_id: grd.grade_value_id,
        weight: gradeWeight,
        comment: gradeComment,
        date: date,
        class_id: selectedClass.class_id,
        teacher_id: user.teacher_id,
        subject_id: subject.subject_id,
      });
      setGrades((grades) => [...grades, response?.data]);
      setStudent(students[students.indexOf(student) + 1]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateGrade = async (grd) => {
    try {
      await axios.put(`/api/v1/grades/grade`, {
        grade_id: grade.grade_id,
        grade_type_id: gradeType.grade_type_id,
        grade_value_id: grd.grade_value_id,
        weight: gradeWeight,
        comment: gradeComment,
      });
      const newGrades = grades.map((g) => {
        if (g.grade_id === grade.grade_id) {
          return {
            ...g,
            text: grd.text,
            type_value: gradeType.value,
            type_text: gradeType.text,
            value: grd.value,
            weight: gradeWeight,
            comment: gradeComment,
          };
        }
        return g;
      });
      setGrades(newGrades);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteGrade = async (grd) => {
    try {
      await axios.delete(`/api/v1/grades/grade/${grade.grade_id}`);
      const newGrades = grades.filter((g) => g.grade_id !== grd.grade_id);
      setGrades(newGrades);
      setGrade(null);
    } catch (err) {
      console.error(err);
    }
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
                onClick={() => handleGradeAction(grd)}
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
