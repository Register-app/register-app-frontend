import { useContext } from "react";
import GradesContext from "context/GradesProvider";

const useGrades = () => {
  return useContext(GradesContext);
};

export default useGrades;
