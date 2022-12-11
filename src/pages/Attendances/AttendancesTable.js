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
    attendanceType,
    setAttendanceType,
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
    setAttendanceType(attendance.type);

  };


  return (
    <>
      <Container className="AttendancesTable border">
        {students?.length ? (
          <>
            <Row>
              <Col md={1} className="border text-center">
                <strong>Numer</strong>
              </Col>
              <Col md={2} className="border text-center">
                <strong>Imie i nazwisko</strong>
              </Col>
              <Col className="border text-center">
                <strong>Frekwencja</strong>
              </Col>
              <Col md={1} className="border">
                <strong>Procent</strong>
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
                <Col className="border">
                  <div className="attendances">
                    {subject ? (
                      attendances.map((grd) =>
                        grd.student_id === std.student_id ? (
                          <div
                            key={grd.attendance_id}
                            onClick={(e) => handleSetAttendance(e, grd)}
                            className={
                              grd.attendance_id === attendance?.attendance_id
                              ? `activeAttendance ${grd.type}`
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
                    0.0
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
