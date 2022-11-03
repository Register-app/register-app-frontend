import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxios from "hooks/useAxios";

const Users = () => {
  const [users, setUsers] = useState();
  const axios = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("/v1/users");
        console.log(response.data);
        setUsers(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();
  }, [axios, location, navigate]);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.email}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
