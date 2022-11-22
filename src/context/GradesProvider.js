import { createContext, useState } from "react";

const GradesContext = createContext({});

export const GradesProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [grade, setGrade] = useState(0);
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [gradeWeight, setGradeWeight] = useState(1);
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [gradeValue, setGradeValue] = useState(0);
  const [gradeId, setGradeId] = useState(0);
  const [studentId, setStudentId] = useState(0);
  const [classId, setClassId] = useState(0);
  const [studentName, setStudentName] = useState("");
  const [studentSecondName, setStudentSecondName] = useState("");
  const [className, setClassName] = useState("");
  const [gradeCategory, setGradeCategory] = useState("");
  const [gradeComment, setGradeComment] = useState("");

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
        gradeCategory,
        setGradeCategory,
        gradeComment,
        setGradeComment,
      }}
    >
      {children}
    </GradesContext.Provider>
  );
};

export default GradesContext;
