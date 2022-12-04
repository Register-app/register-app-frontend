import React, { useEffect } from "react";
import "pages/Attendances/AttendancesTable.css";
import { Col, Container, Row } from "react-bootstrap";
import useAttendances from "hooks/useAttendances";

const AttendancesTable = () => {
  const {
    student,
    setStudent,
    attendance,
    setAttendance,
    attendances,
    students,
    subject,
  } = useAttendances();

  useEffect(() => {
    const element = document.getElementById(`student-${student?.student_id}`);
    if (element) {
      element.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [student]);

  const handleSetStudent = (student) => {
    if (subject) {
      setStudent(student);
      setAttendance(null);

    }
  };



  const handleSetAttendance = (e, attendance) => {
    e.stopPropagation();
    setAttendance(attendance);
    setStudent("");

  };


  return (
    <>
      <Container className="AttendancesTable border">
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
            </Row>
            {students.map((std, idx) => (
              <Row
                id={`student-${std.student_id}`}
                key={idx}
                onClick={() => handleSetStudent(std)}
                style={{ cursor: "pointer" }}
                className={
                  student?.student_id === std.student_id 
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
                  <div className="attendances">
                    {subject ? (
                      attendances.map((grd) =>
                        grd.student_id === std.student_id ? (
                          <div
                            key={grd.attendance_id}
                            onClick={(e) => handleSetAttendance(e, grd)}
                            className={
                              grd.attendance_id === attendance?.attendance_id
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

export default AttendancesTable;
