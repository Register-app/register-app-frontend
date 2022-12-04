import { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import "pages/Attendances/AttendancesButtons.css";
import { useEffect } from "react";
import useAttendances from "hooks/useAttendances";

const AttendancesButtons = () => {
  const {
    student,
    setStudent,
    attendance,
    setAttendance,
    attendances,
    setAttendances,
    students,
    selectedClass,
    attendanceValues,
    setAttendanceValues,
  } = useAttendances();

  const [tempId, setTempId] = useState(100);

  useEffect(() => {
    setAttendanceValues([
      { value: 1, text: "NU" },
      { value: 2, text: "OB" },
      { value: 3, text: "ZW" },
      { value: 4, text: "SP" },
    ]);
  }, [setAttendanceValues]);

  const handleAddAttendance = (grd) => {
    if (attendance) {
      const newAttendances = attendances.map((g) => {
        if (g.attendace_id === attendance.attendance_id) {
          return {
            ...g,
            text: grd.text,
            value: grd.value,

          };
        }
        return g;
      });
      setAttendances(newAttendances);
    } else {
      const newAttendance = {
        student_id: student.student_id,
        attendance_id: tempId,
        text: grd.text,
        value: grd.value,
      };
      setAttendances((prevArray) => [...prevArray, newAttendance]);
      setTempId(tempId + 1);
      setStudent(students[students.indexOf(student) + 1]);
    }
  };

  const handleDeleteAttendance = (grd) => {
    const newAttendances = attendances.filter((g) => g.attendance_id !== grd.attendance_id);
    setAttendances(newAttendances);
    setAttendance(null);
  };
console.log(attendanceValues);
  return (
    <>
      <Container className="AttendancesButtons">
        <Row className="d-flex justify-content-center">
          <div className="btn-container">
            {attendanceValues.map((grd, idx) => (
              <Button
                key={idx}
                variant="outline-dark"
                className="border btn-custom"
                disabled={( !selectedClass || !student) && !attendance}
                onClick={() => handleAddAttendance(grd)}
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
            disabled={!attendance}
            onClick={() => handleDeleteAttendance(attendance)}
          >
            Usuń ocenę
          </Button>
        </Row>
      </Container>
    </>
  );
};

export default AttendancesButtons;
