import { createContext, useState } from "react";

const GradesContext = createContext({});

export const GradesProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [grade, setGrade] = useState(null);
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [weight, setWeight] = useState(Number);
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [gradeValue, setGradeValue] = useState(Number);
  const [gradeId, setGradeId] = useState(Number);
  const [studentId, setStudentId] = useState(Number);
  const [classId, setClassId] = useState(Number);
  const [studentName, setStudentName] = useState("");
  const [studentSecondName, setStudentSecondName] = useState("");
  const [className, setClassName] = useState("");

  return (
    <GradesContext.Provider
      value={{
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
      }}
    >
      {children}
    </GradesContext.Provider>
  );
};

export default GradesContext;
