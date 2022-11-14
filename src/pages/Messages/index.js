import ChatWindow from "pages/Messages/ChatWindow";
import Sidebar from "pages/Messages/Sidebar";
import { Col, Container, Row } from "react-bootstrap";

const Messages = () => {
  return (
    <Container className="Messages justify-content-md-center">
      <Row>
        <Col md={4}>
          <Sidebar />
        </Col>
        <Col md={8}>
          <ChatWindow />
        </Col>
      </Row>
    </Container>
  );
};

export default Messages;
