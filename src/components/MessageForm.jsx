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
      {/* <div className="messages-output">
        {user && !privateMemberMsg?._id && (
          <div className="alert alert-info">{currentRoom}</div>
        )}
        {user && privateMemberMsg?._id && (
          <>
            <div className="alert alert-info conversation-info">
              <div>Twoja rozmowa z {privateMemberMsg.name} </div>
            </div>
          </>
        )}
        {!user && <div className="alert alert-danger">Zaloguj się!</div>}

        {user &&
          messages.map(({ _id: date, messagesByDate }, idx) => (
            <div key={idx}>
              <p className="alert alert-info text-center message-date-indicator">
                {date}
              </p>
              {messagesByDate?.map(
                ({ content, time, from: sender }, msgIdx) => (
                  <div
                    className={
                      sender?.email === user?.email
                        ? "message"
                        : "incoming-message"
                    }
                    key={msgIdx}
                  >
                    <div className="message-inner">
                      <div className="d-flex align-items-center mb-3">
                        />
                        <p className="message-sender">
                          {sender._id === user?._id ? "Ty" : sender.name}
                        </p>
                      </div>
                      <p className="message-content">{content}</p>
                      <p className="message-timestamp-left">{time}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        <div ref={messageEndRef} />
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Twoja wiadomość"
                disabled={!user}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
      </Form> */}
    </>
  );
};

export default MessageForm;
