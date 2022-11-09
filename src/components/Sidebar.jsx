import React, { useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import "components/style/Sidebar.css";
import useMessages from "hooks/useMessages";
import useAuth from "hooks/useAuth";

import { over } from "stompjs";
import SockJS from "sockjs-client";

const BASE_URL = "http://localhost:8080/ws";
var stompClient = null;

const Sidebar = () => {
  const { user } = useAuth();
  const { tab, setTab, privateChats, setPrivateChats, userData, setUserData } =
    useMessages();

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const connect = () => {
    const Sock = new SockJS(BASE_URL);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(
      "/user/" + userData.sender_id + "/private",
      onPrivateMessage
    );
    userJoin();
  };

  const userJoin = () => {
    const chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onError = (err) => {
    console.log(err);
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  // function joinRoom(room) {
  //   if (!user) {
  //     return alert("Zaloguj się!");
  //   }
  //   setCurrentRoom(room);
  // }

  // function orderIds(id1, id2) {
  //   if (id1 > id2) {
  //     return id1 + "-" + id2;
  //   } else {
  //     return id2 + "-" + id1;
  //   }
  // }
  return (
    <>
      <h2>Użytkownicy</h2>
      <div className="member-list">
        <ul>
          {[...privateChats.keys()].map((name, index) => (
            <li
              onClick={() => {
                setTab(name);
              }}
              className={`member ${tab === name && "active"}`}
              key={index}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
