import React, { useState } from "react";
import "pages/Grades/GradesTable.css";
import { Table } from "react-bootstrap";

const grades = [
  {
    student_id: "1",
    grade_id: "1",
    subject: "Przyroda",
    category: "kartkowka",
    grade: "5",
  },
  {
    student_id: "1",
    grade_id: "2",
    subject: "Przyroda",
    category: "sprawdzian",
    grade: "2",
  },
  {
    student_id: "2",
    grade_id: "3",
    subject: "Przyroda",
    category: "aktywnosc",
    grade: "2",
  },
  {
    student_id: "2",
    grade_id: "4",
    subject: "Przyroda",
    category: "aktywnosc",
    grade: "2",
  },
  {
    student_id: "3",
    grade_id: "5",
    subject: "Przyroda",
    category: "aktywnosc",
    grade: "2",
  },
  {
    student_id: "3",
    grade_id: "6",
    subject: "Przyroda",
    category: "aktywnosc",
    grade: "2",
  },
];

const students = [
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
];

const classes = [
  { klasa_id: "1", klasa: "VII A" },
  { klasa_id: "2", klasa: "VI B" },
  { klasa_id: "3", klasa: "IV C" },
];

const GradesTable = () => {
  const [studentState, setStudentState] = useState({});
  const [gradeState, setGradeState] = useState({});
  const [activeStudent, setActiveStudent] = useState("");
  const [activeGrade, setActiveGrade] = useState("");

  const handleSetStudent = (student) => {
    setStudentState(student);
    setActiveStudent(student.student_id);
    setActiveGrade("");
    console.log(student);
  };

  const handleSetGrade = (grade) => {
    setGradeState(grade);
    setActiveGrade(grade.grade_id);
    setActiveStudent("");
    console.log(grade);
  };

  return (
    <>
      {students?.length ? (
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>Numer</th>
              <th>Imie i nazwisko</th>
              <th>Oceny cząstkowe</th>
              <th>Ocena proponowana</th>
              <th>Ocena końcowa</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr
                className={
                  activeStudent === student.student_id ? "activeStudent" : ""
                }
              >
                <td
                  key={idx}
                  onClick={() => handleSetStudent(student)}
                  style={{ cursor: "pointer" }}
                >
                  {idx}
                </td>

                <td>
                  {student.name} {student.second_name}
                </td>
                <td>
                  {grades.map((grade) => (
                    <div
                      key={grade.grade_id}
                      onClick={() => handleSetGrade(grade)}
                      style={{ cursor: "pointer" }}
                      className={
                        activeGrade === grade.grade_id ? "activeGrade" : ""
                      }
                    >
                      {grade.student_id === student.student_id
                        ? grade.grade
                        : ""}
                    </div>
                  ))}
                </td>
                <td>
                  {grades.map((grade) => (
                    <div
                      key={grade.grade_id}
                      onClick={() => handleSetGrade(grade)}
                      style={{ cursor: "pointer" }}
                      className={
                        activeGrade === grade.grade_id ? "activeGrade" : ""
                      }
                    >
                      {grade.student_id === student.student_id ? "2" : ""}
                    </div>
                  ))}
                </td>
                <td>
                  {grades.map((grade) => (
                    <div
                      key={grade.grade_id}
                      onClick={() => handleSetGrade(grade)}
                      style={{ cursor: "pointer" }}
                      className={
                        activeGrade === grade.grade_id ? "activeGrade" : ""
                      }
                    >
                      {grade.student_id === student.student_id ? "2" : ""}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Brak uczniów</p>
      )}
    </>
  );
};

export default GradesTable;
