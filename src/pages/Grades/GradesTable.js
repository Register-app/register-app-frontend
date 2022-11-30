import React, { useEffect } from "react";
import "pages/Grades/GradesTable.css";
import { Col, Container, Row } from "react-bootstrap";
import useGrades from "hooks/useGrades";

const GradesTable = () => {
  const {
    student,
    setStudent,
    grade,
    setGrade,
    grades,
    students,
    gradeType,
    setGradeType,
    gradeTypes,
    subject,
    setGradeWeight,
  } = useGrades();

  useEffect(() => {
    const element = document.getElementById(`student-${student?.student_id}`);
    if (element) {
      element.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [student]);

  const handleSetStudent = (student) => {
    if (subject) {
      setStudent(student);
      setGrade(null);
      if (gradeType?.value === "proposed" || gradeType?.value === "final") {
        setGradeType(null);
      }
    }
  };

  const handleSetStudentProposedGrade = (e, student) => {
    e.stopPropagation();
    if (
      !grades.find(
        (grd) =>
          grd.student_id === student.student_id && grd.type === "proposed"
      )
    ) {
      setStudent(student);
      setGradeType(gradeTypes.filter((gt) => gt.value === "proposed")[0]);
      setGrade(null);
    }
  };

  const handleSetStudentFinalGrade = (e, student) => {
    e.stopPropagation();
    if (
      !grades.find(
        (grd) => grd.student_id === student.student_id && grd.type === "final"
      )
    ) {
      setStudent(student);
      setGradeType(gradeTypes.filter((gt) => gt.value === "final")[0]);
      setGrade("");
    }
  };

  const handleSetGrade = (e, grade) => {
    e.stopPropagation();
    setGrade(grade);
    setStudent("");
    setGradeType(grade.type);
    setGradeWeight(grade.weight);
  };

  const calculateAvg = (grades, std) => {
    let studentGrades = grades.filter(
      (grd) =>
        grd.student_id === std.student_id &&
        grd.type !== "proposed" &&
        grd.type !== "final"
    );
    let numerator = 0;
    let denominator = 0;
    studentGrades.forEach((grade) => {
      numerator = numerator + grade.weight * grade.value;
      denominator = denominator + grade.weight;
    });
    return (numerator / denominator).toFixed(2);
  };

  return (
    <>
      <Container className="GradesTable border">
        {students?.length ? (
          <>
            <Row>
              <Col md={1} className="border">
                <strong>Numer</strong>
              </Col>
              <Col md={2} className="border">
                <strong>Imie i nazwisko</strong>
              </Col>
              <Col md={4} className="border">
                <strong>Oceny cząstkowe</strong>
              </Col>
              <Col md={1} className="border">
                <strong>Średnia</strong>
              </Col>
              <Col md={2} className="border">
                <strong>Ocena proponowana</strong>
              </Col>
              <Col md={2} className="border">
                <strong>Ocena końcowa</strong>
              </Col>
            </Row>
            {students.map((std, idx) => (
              <Row
                id={`student-${std.student_id}`}
                key={idx}
                onClick={() => handleSetStudent(std)}
                style={{ cursor: "pointer" }}
                className={
                  student?.student_id === std.student_id &&
                  gradeType?.value !== "final" &&
                  gradeType?.value !== "proposed"
                    ? "activeStudent"
                    : ""
                }
              >
                <Col md={1} className="border">
                  {++idx}
                </Col>

                <Col
                  md={2}
                  className="border"
                  onClick={() => handleSetStudent(std)}
                >
                  {std.name} {std.second_name}
                </Col>
                <Col md={4} className="border">
                  <div className="grades">
                    {subject ? (
                      grades.map((grd) =>
                        grd.student_id === std.student_id &&
                        grd.type !== "proposed" &&
                        grd.type !== "final" ? (
                          <div
                            key={grd.grade_id}
                            onClick={(e) => handleSetGrade(e, grd)}
                            className={
                              grd.grade_id === grade?.grade_id
                                ? `activeGrade ${grd.type}`
                                : grd.type
                            }
                          >
                            {grd.text}
                          </div>
                        ) : null
                      )
                    ) : (
                      <>Wybierz przedmiot</>
                    )}
                  </div>
                </Col>
                <Col md={1} className="border">
                  <div className="average">
                    {calculateAvg(grades, std) !== "NaN"
                      ? calculateAvg(grades, std)
                      : "0.00"}
                  </div>
                </Col>
                <Col
                  md={2}
                  onClick={(e) => handleSetStudentProposedGrade(e, std)}
                  className={
                    student?.student_id === std.student_id &&
                    gradeType?.value !== "final" &&
                    gradeType?.value === "proposed"
                      ? "activeStudent border"
                      : "border"
                  }
                >
                  <div className="proposed-grade">
                    {subject ? (
                      grades.map((grd) =>
                        grd.student_id === std.student_id &&
                        grd.type === "proposed" ? (
                          <div
                            key={grd.grade_id}
                            onClick={(e) => handleSetGrade(e, grd)}
                            className={
                              grd.grade_id === grade?.grade_id
                                ? `activeGrade ${grd.type}`
                                : grd.type
                            }
                          >
                            {grd.text}
                          </div>
                        ) : null
                      )
                    ) : (
                      <>Wybierz przedmiot</>
                    )}
                  </div>
                </Col>
                <Col
                  md={2}
                  onClick={(e) => handleSetStudentFinalGrade(e, std)}
                  className={
                    student?.student_id === std.student_id &&
                    gradeType?.value === "final" &&
                    gradeType?.value !== "proposed"
                      ? "activeStudent border"
                      : "border"
                  }
                >
                  <div className="final-grade">
                    {subject ? (
                      grades.map((grd) =>
                        grd.student_id === std.student_id &&
                        grd.type === "final" ? (
                          <div
                            key={grd.grade_id}
                            onClick={(e) => handleSetGrade(e, grd)}
                            className={
                              grd.grade_id === grade?.grade_id
                                ? `activeGrade ${grd.type}`
                                : grd.type
                            }
                          >
                            {grd.text}
                          </div>
                        ) : null
                      )
                    ) : (
                      <>Wybierz przedmiot</>
                    )}
                  </div>
                </Col>
              </Row>
            ))}
          </>
        ) : (
          <p>Brak uczniów</p>
        )}
      </Container>
    </>
  );
};

export default GradesTable;
