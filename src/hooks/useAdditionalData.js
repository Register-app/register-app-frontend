import useAuth from "hooks/useAuth";
import useAxios from "hooks/useAxios";
import { checkRoles } from "utils/checkRoles";

const useAdditionalData = () => {
  const { user, setUser } = useAuth();
  const axios = useAxios();

  const data = () => {
    if (!user.teacher_id && checkRoles(user, ["ROLE_TEACHER"])) {
      getAdditionalId("teachers");
    }
    if (!user.student_id && checkRoles(user, ["ROLE_STUDENT"])) {
      getAdditionalId("students");
    }
    if (!user.guardian_id && checkRoles(user, ["ROLE_GUARDIAN"])) {
      getAdditionalId("guardians");
    }
  };

  const getAdditionalId = async (userType) => {
    try {
      const response = await axios.get(
        `/api/v1/${userType}/user/${user.user_id}`
      );
      const additionalId = response?.data;
      const merged = { ...user, ...additionalId };
      localStorage.setItem("user", JSON.stringify(merged));
      setUser(merged);
    } catch (err) {
      console.error(err);
    }
  };

  return data;
};

export default useAdditionalData;
