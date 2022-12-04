import { useContext } from "react";
import AttendancesContext from "context/AttendancesProvider";

const useAttendances = () => {
  return useContext(AttendancesContext);
};

export default useAttendances;
