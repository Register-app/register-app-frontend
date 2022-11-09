import React, { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import "components/style/Sidebar.css";
import useAuth from "hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "hooks/useAxios";

const Sidebar = () => {
  const { user } = useAuth();
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
    <>
      <h2>Użytkownicy</h2>
      {users?.length ? (
        <ListGroup>
          {users.map((usr) => (
            <ListGroup.Item
              key={usr.name}
              style={{ cursor: "pointer" }}
              disabled={usr.user_id === user.user_id}
            >
              <Row>
                <Col xs={2} className="member-status">
                  <img src={usr.picture} className="member-status-img" />
                  {usr.status === "online" ? (
                    <i className="fas fa-circle sidebar-online-status"></i>
                  ) : (
                    <i className="fas fa-circle sidebar-offline-status"></i>
                  )}
                </Col>
                <Col xs={9}>
                  {usr.name}
                  {usr.user_id === user?._id && " (Ty)"}
                  {usr.status === "offline" && " (Offline)"}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No users to display</p>
      )}
    </>
  );
};

export default Sidebar;
