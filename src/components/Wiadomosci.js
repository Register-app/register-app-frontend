
import { Component } from "react";
import ListaWiadomosci from './ListaWiadomosci';
import NowaWiadomosc from './NowaWiadomosc';
import { Row, Container} from 'react-bootstrap';
import "./style/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";


class Wiadomosci extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      showHideListaWiadomosci: true,
      showHideNowaWiadomosc: false
    };
    this.hideComponent = this.hideComponent.bind(this);
  }

  hideComponent(name) {
    console.log(name);
    switch (name) {

      case "showHideNowaWiadomosc":
        this.setState({ showHideListaWiadomosci: !this.state.showHideListaWiadomosci });
        this.setState({ showHideNowaWiadomosc: !this.state.showHideNowaWiadomosc });
        break;
      case "showHideListaWiadomosci":
        this.setState({ showHideListaWiadomosci: !this.state.showHideListaWiadomosci });
        this.setState({ showHideNowaWiadomosc: !this.state.showHideNowaWiadomosc });
        break;
      default:
        this.setState({ showHideListaWiadomosci: true });
    }
  }

  render() {
    const { showHideListaWiadomosci, showHideNowaWiadomosc } = this.state;
    return (
      <Container className="justify-content-md-center min-vh-100">
      
      <Row className="text-center">
      <div class="row gy-4"> 
         
          <div><button type="button" onClick={() => this.hideComponent("showHideNowaWiadomosc")} class="btn btn-secondary">Nowa wiadomość</button></div>
          
          {showHideListaWiadomosci && <ListaWiadomosci />}
          {showHideNowaWiadomosc && <NowaWiadomosc />}
        </div>
        </Row>
        </Container>
    );
  }
}

export default Wiadomosci;
