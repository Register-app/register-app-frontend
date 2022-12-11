import { useContext } from "react";
import TimetableContext from "context/TimetableProvider";

const useTimetable = () => {
  return useContext(TimetableContext);
};

export default useTimetable;
 