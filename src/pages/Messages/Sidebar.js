import SearchBar from "components/form/SearchBar";
import useAuth from "hooks/useAuth";
import useAxios from "hooks/useAxios";
import useMessages from "hooks/useMessages";
import "pages/Messages/Sidebar.css";
import { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";

const WEBSOCKET_URL = "http://localhost:8080/ws";
const GET_USERS_URL = "/api/v1/users";

const Sidebar = () => {
  const { user } = useAuth();
  const {
    users,
    setUsers,
    userMsg,
    setUserMsg,
    setMessages,
    setStompClient,
    subscription,
    setSubscription,
  } = useMessages();
  let { stompClient } = useMessages();

  const axios = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchedUsers, setSearchedUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(GET_USERS_URL);
        setUsers(response.data);
        setSearchedUsers(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    if (userMsg) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [userMsg]);

  const disconnect = () => {
    if (subscription) {
      subscription.unsubscribe();
    }
    if (stompClient) {
      stompClient.disconnect();
    }
  };

  const handleUserMsg = (usr) => {
    setUserMsg(usr);
    getMessages(usr);
  };

  const connect = () => {
    const Sock = new SockJS(WEBSOCKET_URL);
    if (!stompClient || !stompClient?.connected) {
      stompClient = over(Sock);
      setStompClient(stompClient);
      stompClient.connect({}, setTimeout(onConnected, 500));
    }
  };

  const onConnected = () => {
    const subscription = stompClient.subscribe(
      "/user/messages/" + user.user_id,
      onMessage
    );
    setSubscription(subscription);
  };

  const onMessage = (payload) => {
    const message = JSON.parse(payload.body);
    console.log(message.receiver_id);
    console.log(userMsg.user_id);
    if (message.sender_id === userMsg.user_id) {
      setMessages((messages) => [...messages, message]);
    }
  };

  const getMessages = async (usr) => {
    try {
      const response = await axios.get(
        `/api/v1/messages/sender/${user.user_id}/receiver/${usr.user_id}`
      );
      setMessages(response?.data);
    } catch (error) {
      console.error("Błąd ładowania wiadomości!", error);
    }
  };

  return (
    <>
      <h2 className="text-center">Użytkownicy</h2>
      {users?.length ? (
        <>
          <SearchBar
            data={users}
            setSearchedData={setSearchedUsers}
            dataToSearch="second_name"
          />
          <ListGroup>
            {searchedUsers.map((usr) => (
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
        </>
      ) : (
        <p>Brak użytkowników do wyświetlenia.</p>
      )}
    </>
  );
};

export default Sidebar;
