import "components/navigation/Navigation.css";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { LinkContainer } from "react-router-bootstrap";

const Navigation = () => {
  return (
    <Container className="Navigation" fluid>
      <Row>
        <Navbar>
          <Nav defaultActiveKey="/">
            <Col>
              <LinkContainer to="/lesson-plan" className="btn border">
                <Nav.Link>
                  <Icon.Calendar2Week size={50} />
                  <div className="navText">Plan lekcji</div>
                </Nav.Link>
              </LinkContainer>
            </Col>
            <Col>
              <LinkContainer to="/grades" className="btn border">
                <Nav.Link>
                  <Icon.JournalBookmark size={50} />
                  <div className="navText">Oceny</div>
                </Nav.Link>
              </LinkContainer>
            </Col>
            <Col>
              <LinkContainer to="/timetable" className="btn border">
                <Nav.Link>
                  <Icon.Calendar2Date size={50} />
                  <div className="navText">Terminarz</div>
                </Nav.Link>
              </LinkContainer>
            </Col>
            <Col>
              <LinkContainer to="/messages" className="btn border">
                <Nav.Link>
                  <Icon.Envelope size={50} />
                  <div className="navText">Wiadomości</div>
                </Nav.Link>
              </LinkContainer>
            </Col>
            <Col>
              <LinkContainer to="/attendances" className="btn border">
                <Nav.Link>
                  <Icon.Calendar3 size={50} />
                  <div className="navText">Frekwencja</div>
                </Nav.Link>
              </LinkContainer>
            </Col>
          </Nav>
        </Navbar>
      </Row>
    </Container>
  );
};

export default Navigation;
