import React, { startTransition, useEffect, useRef } from "react";
import "pages/Grades/GradesTable.css";
import { Col, Container, Row, Table } from "react-bootstrap";
import useGrades from "hooks/useGrades";
import useAxios from "hooks/useAxios";

const GradesTable = () => {
  const {
    student,
    setStudent,
    grade,
    setGrade,
    grades,
    setGrades,
    students,
    setStudents,
    gradeCategory,
    setGradeCategory,
    classes,
    setClasses,
    selectedClass,
    setSelectedClass,
    gradeWeight,
    setGradeWeight,
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

  const axios = useAxios();

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await axios.get("/v1/students/class/1");
        setStudents(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getStudents();
  }, []);

  useEffect(() => {
    const element = document.getElementById(`student-${student?.student_id}`);
    if (element) {
      element.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [student]);

  useEffect(() => {
    setGrades([
      {
        student_id: 1,
        grade_id: 1,
        subject: "Przyroda",
        category: "Kartkówka",
        text: "5",
        weight: 1,
        value: 5,
      },
      {
        student_id: 1,
        grade_id: 2,
        subject: "Przyroda",
        category: "Sprawdzian",
        text: "2",
        weight: 2,
        value: 2,
      },
      {
        student_id: 2,
        grade_id: 3,
        subject: "Przyroda",
        category: "Aktywność",
        text: "2",
        weight: 1,
        value: 2,
      },
      {
        student_id: 2,
        grade_id: 4,
        subject: "Przyroda",
        category: "Aktywność",
        text: "2",
        weight: 1,
        value: 2,
      },
      {
        student_id: 3,
        grade_id: 5,
        subject: "Przyroda",
        category: "Aktywność",
        text: "2",
        weight: 1,
        value: 2,
      },
      {
        student_id: 3,
        grade_id: 6,
        subject: "Przyroda",
        category: "Aktywność",
        text: "2",
        weight: 1,
        value: 2,
      },
    ]);
  }, []);

  const handleSetStudent = (student) => {
    setStudent(student);
    setGrade("");
    if (gradeCategory === "Propozycja" || gradeCategory === "Końcowa") {
      setGradeCategory("");
    }
  };

  const handleSetStudentProposedGrade = (e, student) => {
    e.stopPropagation();
    if (
      !grades.find(
        (grd) =>
          grd.student_id === student.student_id && grd.category === "Propozycja"
      )
    ) {
      setStudent(student);
      setGradeCategory("Propozycja");
      setGrade("");
    }
  };

  const handleSetStudentFinalGrade = (e, student) => {
    e.stopPropagation();
    if (
      !grades.find(
        (grd) =>
          grd.student_id === student.student_id && grd.category === "Końcowa"
      )
    ) {
      setStudent(student);
      setGradeCategory("Końcowa");
      setGrade("");
    }
  };

  const handleSetGrade = (e, grade) => {
    e.stopPropagation();
    setGrade(grade);
    setStudent("");
    setGradeCategory(grade.category);
    setGradeWeight(grade.weight);
  };

  const calculateAvg = (grades, std) => {
    let studentGrades = grades.filter(
      (grd) =>
        grd.student_id === std.student_id &&
        grd.category !== "Propozycja" &&
        grd.category !== "Końcowa"
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
            <Row md={8}>
              <Col md={1} className="border">
                Numer
              </Col>
              <Col md={2} className="border">
                Imie i nazwisko
              </Col>
              <Col md={4} className="border">
                Oceny cząstkowe
              </Col>
              <Col md={1} className="border">
                Średnia
              </Col>
              <Col md={2} className="border">
                Ocena proponowana
              </Col>
              <Col md={2} className="border">
                Ocena końcowa
              </Col>
            </Row>
            {students.map((std, idx) => (
              <Row
                id={`student-${std.student_id}`}
                key={idx}
                md={12}
                onClick={() => handleSetStudent(std)}
                style={{ cursor: "pointer" }}
                className={
                  student?.student_id === std.student_id &&
                  gradeCategory !== "Końcowa" &&
                  gradeCategory !== "Propozycja"
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
                    {grades.map((grd) =>
                      grd.student_id === std.student_id &&
                      grd.category !== "Propozycja" &&
                      grd.category !== "Końcowa" ? (
                        <div
                          key={grd.grade_id}
                          onClick={(e) => handleSetGrade(e, grd)}
                          className={
                            grd.grade_id === grade?.grade_id
                              ? `activeGrade ${grd.category}`
                              : grd.category
                          }
                        >
                          {grd.text}
                        </div>
                      ) : null
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
                    gradeCategory !== "Końcowa" &&
                    gradeCategory === "Propozycja"
                      ? "activeStudent border"
                      : "border"
                  }
                >
                  <div className="proposed-grade">
                    {grades.map((grd) =>
                      grd.student_id === std.student_id &&
                      grd.category === "Propozycja" ? (
                        <div
                          key={grd.grade_id}
                          onClick={(e) => handleSetGrade(e, grd)}
                          className={
                            grd.grade_id === grade?.grade_id
                              ? `activeGrade ${grd.category}`
                              : grd.category
                          }
                        >
                          {grd.text}
                        </div>
                      ) : null
                    )}
                  </div>
                </Col>
                <Col
                  md={2}
                  onClick={(e) => handleSetStudentFinalGrade(e, std)}
                  className={
                    student?.student_id === std.student_id &&
                    gradeCategory === "Końcowa" &&
                    gradeCategory !== "Propozycja"
                      ? "activeStudent border"
                      : "border"
                  }
                >
                  <div className="final-grade">
                    {grades.map((grd) =>
                      grd.student_id === std.student_id &&
                      grd.category === "Końcowa" ? (
                        <div
                          key={grd.grade_id}
                          onClick={(e) => handleSetGrade(e, grd)}
                          className={
                            grd.grade_id === grade?.grade_id
                              ? `activeGrade ${grd.category}`
                              : grd.category
                          }
                        >
                          {grd.text}
                        </div>
                      ) : null
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
