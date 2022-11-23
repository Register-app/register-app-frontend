import logo from "assets/logo.PNG";
import useAuth from "hooks/useAuth";
import useLogout from "hooks/useLogout";
import {
  Button,
  Col,
  Container,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    logout();
    navigate("/", { state: { from: location }, replace: true });
  };

  return (
    <Container className="Header">
      <Row className="d-flex justify-content-between">
        <Navbar bg="light">
          <Col className="ps-5">
            <LinkContainer to="/">
              <Navbar.Brand>
                <img alt="E-Dziennik" src={logo} width="200" height="70" />
              </Navbar.Brand>
            </LinkContainer>
          </Col>
          <Col className="d-flex align-items-center px-5">
            {user && (
              <>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse
                  id="basic-navbar-nav"
                  className="d-flex justify-content-end"
                >
                  <NavDropdown
                    title={`Witaj, ${user.name} ${user.second_name}`}
                  >
                    <LinkContainer to="/">
                      <NavDropdown.Item>Nowa wiadomość</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/home">
                      <NavDropdown.Item>Ustawienia</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      <Button onClick={handleLogout}>Wyloguj</Button>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Navbar.Collapse>
              </>
            )}
          </Col>
        </Navbar>
      </Row>
    </Container>
  );
};

export default Header;
