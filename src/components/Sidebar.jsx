import React, { useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import "components/style/Sidebar.css";
import useMessages from "hooks/useMessages";
import useAuth from "hooks/useAuth";
import useAxios from "hooks/useAxios";
import { useLocation, useNavigate } from "react-router-dom";
import { over } from "stompjs";
import SockJS from "sockjs-client";

const WEBSOCKET_URL = "http://localhost:8080/ws";
const GET_USERS_URL = "/v1/users";
const GET_MESSAGES_URL = "/v1/messages/listmessage";

let stompClient;

const Sidebar = () => {
  const { user } = useAuth();
  const { users, setUsers, userMsg, setUserMsg, setMessages, setStompClient } =
    useMessages();

  const axios = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(GET_USERS_URL);
        setUsers(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();
  }, [axios, location, navigate, setUsers]);

  const handleUserMsg = (usr) => {
    connect();
    setUserMsg(usr);
    getMessages(usr);
  };

  const connect = async () => {
    const Sock = new SockJS(WEBSOCKET_URL);
    if (!stompClient) {
      stompClient = over(Sock);
      setStompClient(over(Sock));
      await stompClient.connect({}, setTimeout(onConnected, 500));
    }
  };

  const onConnected = () => {
    stompClient.subscribe("/user/messages/" + user.user_id, onMessage);
  };

  const onMessage = (response) => {
    const data = JSON.parse(response.body);
    setMessages((prevArray) => [...prevArray, data]);
  };

  const getMessages = async (usr) => {
    try {
      const response = await axios.post(GET_MESSAGES_URL, {
        sender_id: user.user_id,
        receiver_id: usr.user_id,
      });
      setMessages(response?.data);
    } catch (error) {
      console.error("Błąd ładowania wiadomości!", error);
    }
  };

  return (
    <>
      <h2 className="text-center">Użytkownicy</h2>
      {users?.length ? (
        <ListGroup>
          {users.map((usr) => (
            <ListGroup.Item
              key={usr.user_id}
              style={{ cursor: "pointer" }}
              active={userMsg?.user_id === usr?.user_id}
              onClick={() => handleUserMsg(usr)}
              disabled={usr.user_id === user.user_id}
            >
              <Row>
                <Col xs={2} className="member-status">
                  <i className="fas fa-2x fa-message member-status-img"></i>
                </Col>
                <Col xs={9}>
                  {usr.name} {usr.second_name}
                  {usr.user_id === user?.user_id && " (Ty)"}
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
