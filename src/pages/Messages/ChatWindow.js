import useAuth from "hooks/useAuth";
import useMessages from "hooks/useMessages";
import "pages/Messages/ChatWindow.css";
import { useEffect, useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const ChatWindow = () => {
  const { user } = useAuth();
  const { userMsg, messages, setMessages, message, setMessage, stompClient } =
    useMessages();
  const messageEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return year + "-" + month + "-" + day;
  };

  const getFormattedTime = () => {
    const date = new Date();

    let hour = date.getHours().toString();
    hour = hour.length > 1 ? hour : "0" + hour;

    let minute = date.getMinutes().toString();
    minute = minute.length > 1 ? minute : "0" + minute;

    let second = date.getSeconds().toFixed(0).toString();
    second = second.length > 1 ? second : "0" + second;

    return hour + ":" + minute + ":" + second;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    if (stompClient) {
      const chatMessage = {
        sender_id: user.user_id,
        content: message,
        receiver_id: userMsg.user_id,
        date: getFormattedDate(),
        time: getFormattedTime(),
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setMessages((prevArray) => [...prevArray, chatMessage]);
    }
    setMessage("");
  };

  return (
    <>
      <div className="messages-output">
        {userMsg?.user_id && (
          <>
            <div className="alert alert-info conversation-info">
              <div className="conversation-profile-pic">
                Twoja rozmowa z {userMsg.name}{" "}
                <i className="fas fa-2x fa-message"></i>
              </div>
            </div>
          </>
        )}

        {messages.map((message, idx) => (
          <div
            className={
              message?.sender_id === user?.user_id
                ? "message"
                : "incoming-message"
            }
            key={idx}
          >
            <div className="message-inner">
              <div className="d-flex align-items-center mb-3">
                <i className="fas fa-2x fa-message"></i>
                <p className="message-sender">
                  {message.sender_id === user?.user_id
                    ? "Ty"
                    : message.sender_name + " " + message.sender_second_name}
                </p>
              </div>
              <p className="message-content">{message.content}</p>
              <p className="message-timestamp-left">
                {message.date} {message.time}
              </p>
            </div>
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
                disabled={!user || !userMsg}
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
              disabled={!user || !userMsg}
            >
              <i className="fas fa-paper-plane"></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ChatWindow;
