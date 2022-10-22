import "./style/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../logo.PNG";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

const handleClick = (e) => {
  e.preventDefault();
  // console.log('The link was clicked.');
  alert("Zaloguj sie");
}

function Header() {
  return (
  <header>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
            <img alt="E-Dziennik" src={logo} width="200" height="70" className="d-inline-block align-top"/>{' '}{/* Tekst obok loga */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="me-auto">
          {/* Hiperlacza obok loga
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link> */}
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link>
              {/* To sie przyda gdy bedzie user zalogowany */}
              <NavDropdown title="Witaj, imie i nazwisko" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
              <Button onClick={handleClick}>Wyloguj</Button>
              </NavDropdown.Item>
            </NavDropdown>
            </Nav.Link>
            {/* <Button onClick={handleClick}>Wyloguj</Button> */}
        </Nav>
        </Navbar.Collapse>
        


      </Container>
    </Navbar>
  </header>
  );
}

export default Header;
