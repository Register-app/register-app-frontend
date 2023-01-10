import { createContext, useState } from "react";

const AttendancesContext = createContext({});

export const AttendancesProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState(0);
  const [attendances, setAttendances] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [subject, setSubject] = useState(null);
  const [attendanceValues, setAttendanceValues] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [studentId, setStudentId] = useState(0);
  const [classId, setClassId] = useState(0);
  const [studentName, setStudentName] = useState("");
  const [studentSecondName, setStudentSecondName] = useState("");
  const [attendanceTypes, setAttendanceTypes] = useState([]);
  const [attendanceType, setAttendanceType] = useState(null);


  return (
    <AttendancesContext.Provider
      value={{
        student,
        setStudent,
        attendance,
        setAttendance,
        attendances,
        setAttendances,
        students,
        setStudents,
        classes,
        setClasses,
        selectedClass,
        setSelectedClass,
        subject,
        setSubject,
        attendanceValues,
        setAttendanceValues,
        subjects,
        setSubjects,
        studentId,
        setStudentId,
        classId,
        setClassId,
        studentName,
        setStudentName,
        studentSecondName,
        setStudentSecondName,
        attendanceType,
        setAttendanceType,
        attendanceTypes,
        setAttendanceTypes,
      }}
    >
      {children}
    </AttendancesContext.Provider>
  );
};

export default AttendancesContext;
