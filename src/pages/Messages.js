import React from "react";
import Sidebar from "components/Sidebar";
import MessageForm from "components/MessageForm";
import { Col, Row, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Messages = () => {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Sidebar />
        </Col>
        <Col md={8}>
          <MessageForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Messages;
