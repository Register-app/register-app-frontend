import React, { useEffect } from "react";
import "pages/Grades/GradesTable.css";
import { Container, Table } from "react-bootstrap";
import useGrades from "hooks/useGrades";

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

  useEffect(() => {
    setStudents([
      {
        student_id: "1",
        name: "Jan",
        second_name: "Kowal",
      },
      {
        student_id: "2",
        name: "Janina",
        second_name: "Bareja",
      },
      {
        student_id: "3",
        name: "Karolina",
        second_name: "Turban",
      },
    ]);

    setGrades([
      {
        student_id: "1",
        grade_id: "1",
        subject: "Przyroda",
        category: "Kartkówka",
        text: "5",
      },
      {
        student_id: "1",
        grade_id: "2",
        subject: "Przyroda",
        category: "Sprawdzian",
        text: "2",
      },
      {
        student_id: "2",
        grade_id: "3",
        subject: "Przyroda",
        category: "Aktywność",
        text: "2",
      },
      {
        student_id: "2",
        grade_id: "4",
        subject: "Przyroda",
        category: "Aktywność",
        text: "2",
      },
      {
        student_id: "3",
        grade_id: "5",
        subject: "Przyroda",
        category: "Aktywność",
        text: "2",
      },
      {
        student_id: "3",
        grade_id: "6",
        subject: "Przyroda",
        category: "Aktywność",
        text: "2",
      },
    ]);
  }, []);

  const handleSetStudent = (student) => {
    setStudent(student);
    setGrade("");
    console.log(student);
  };

  const handleSetGrade = (grade) => {
    setGrade(grade);
    setStudent("");
    console.log(grade);
  };

  return (
    <>
      <Container className="GradesTable" fluid>
        {students?.length ? (
          <Table striped bordered hover responsive="sm" fluid>
            <thead>
              <tr>
                <th>Numer</th>
                <th>Imie i nazwisko</th>
                <th>Oceny cząstkowe</th>
                <th>Ocena Proponowana</th>
                <th>Ocena Końcowa</th>
              </tr>
            </thead>
            <tbody>
              {students.map((std, idx) => (
                <tr
                  className={
                    student?.student_id === std.student_id
                      ? "activeStudent"
                      : ""
                  }
                >
                  <td
                    key={idx}
                    onClick={() => handleSetStudent(std)}
                    style={{ cursor: "pointer" }}
                  >
                    {idx}
                  </td>

                  <td>
                    {std.name} {std.second_name}
                  </td>
                  <td>
                    <div className="grades">
                      {grades.map((grd) =>
                        grd.student_id === std.student_id &&
                        grd.category !== "Propozycja" &&
                        grd.category !== "Końcowa" ? (
                          <div
                            key={grd.grade_id}
                            onClick={() => handleSetGrade(grd)}
                            style={{ cursor: "pointer" }}
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
                  </td>
                  <td>
                    <div className="proposed-grade">
                      {grades.map((grd) =>
                        grd.student_id === std.student_id &&
                        grd.category === "Propozycja" ? (
                          <div
                            key={grd.grade_id}
                            onClick={() => handleSetGrade(grd)}
                            style={{ cursor: "pointer" }}
                            className={
                              grd.grade_id === grade.grade_id
                                ? `activeGrade ${grd.category}`
                                : grd.category
                            }
                          >
                            {grd.text}
                          </div>
                        ) : null
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="final-grade">
                      {grades.map((grd) =>
                        grd.student_id === std.student_id &&
                        grd.category === "Końcowa" ? (
                          <div
                            key={grd.grade_id}
                            onClick={() => handleSetGrade(grd)}
                            style={{ cursor: "pointer" }}
                            className={
                              grd.grade_id === grade.grade_id
                                ? `activeGrade ${grd.category}`
                                : grd.category
                            }
                          >
                            {grd.text}
                          </div>
                        ) : null
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>Brak uczniów</p>
        )}
      </Container>
    </>
  );
};

export default GradesTable;
