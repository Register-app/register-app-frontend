import { createContext, useState } from "react";

const GradesContext = createContext({});

export const GradesProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [grade, setGrade] = useState(0);
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [gradeWeight, setGradeWeight] = useState(1);
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState(null);
  const [gradeValues, setGradeValues] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [studentId, setStudentId] = useState(0);
  const [classId, setClassId] = useState(0);
  const [studentName, setStudentName] = useState("");
  const [studentSecondName, setStudentSecondName] = useState("");
  const [gradeTypes, setGradeTypes] = useState([]);
  const [gradeType, setGradeType] = useState(null);
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
        gradeValues,
        setGradeValues,
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
        gradeType,
        setGradeType,
        gradeComment,
        setGradeComment,
        gradeTypes,
        setGradeTypes,
      }}
    >
      {children}
    </GradesContext.Provider>
  );
};

export default GradesContext;
