import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "components/Sidebar";
import MessageForm from "components/MessageForm";

const Messages = () => {
  return (
    <Container className="Messages justify-content-md-center">
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
