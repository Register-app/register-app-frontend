import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "components/style/MessageForm.css";
import useAuth from "hooks/useAuth";
import useMessages from "hooks/useMessages";

import { over } from "stompjs";
import SockJS from "sockjs-client";

const BASE_URL = "http://localhost:8080/ws";
let stompClient = null;

const MessageForm = () => {
  const { user } = useAuth();
  const { tab, setTab, privateChats, setPrivateChats, userData, setUserData } =
    useMessages();

  const connect = () => {
    const Sock = new SockJS(BASE_URL);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
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

  // const messageEndRef = useRef(null);
  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  // const handleMessage = (event) => {
  //   const { value } = event.target;
  //   setUserData({ ...userData, message: value });
  // };
  // const sendValue = () => {
  //   if (stompClient) {
  //     var chatMessage = {
  //       senderName: userData.username,
  //       message: userData.message,
  //       status: "MESSAGE",
  //     };
  //     console.log(chatMessage);
  //     stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  //     setUserData({ ...userData, message: "" });
  //   }
  // };

  // const sendPrivateValue = () => {
  //   if (stompClient) {
  //     var chatMessage = {
  //       senderName: userData.username,
  //       receiverName: tab,
  //       message: userData.message,
  //       status: "MESSAGE",
  //     };

  //     if (userData.username !== tab) {
  //       privateChats.get(tab).push(chatMessage);
  //       setPrivateChats(new Map(privateChats));
  //     }
  //     stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
  //     setUserData({ ...userData, message: "" });
  //   }
  // };

  // const handleUsername = (event) => {
  //   const { value } = event.target;
  //   setUserData({ ...userData, username: value });
  // };

  // function getFormattedDate() {
  //   const date = new Date();
  //   const year = date.getFullYear();
  //   let month = (1 + date.getMonth()).toString();

  //   month = month.length > 1 ? month : "0" + month;
  //   let day = date.getDate().toString();

  //   day = day.length > 1 ? day : "0" + day;

  //   return month + "/" + day + "/" + year;
  // }

  // function scrollToBottom() {
  //   messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }

  // const todayDate = getFormattedDate();

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   if (!message) return;
  //   const today = new Date();
  //   const minutes =
  //     today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
  //   const time = today.getHours() + ":" + minutes;
  //   const roomId = currentRoom;
  //   setMessage("");
  // }
  return (
    <>
      <div className="messages-output">
        {user && <div className="alert alert-info"></div>}
        {user && (
          <>
            <div className="alert alert-info conversation-info">
              <div>Twoja rozmowa z </div>
            </div>
          </>
        )}
        {!user && <div className="alert alert-danger">Zaloguj się!</div>}
      </div>
      <Form>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Twoja wiadomość"
                disabled={!user}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%", backgroundColor: "orange" }}
              disabled={!user}
            >
              <i className="fas fa-paper-plane"></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default MessageForm;
