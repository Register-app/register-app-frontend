import { Component } from "react";
import MessagesList from "components/MessagesList";
import NewMessage from "components/NewMessage";
import { Row, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Messages extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      showHideListaWiadomosci: true,
      showHideNowaWiadomosc: false,
    };
    this.hideComponent = this.hideComponent.bind(this);
  }

  hideComponent(name) {
    console.log(name);
    switch (name) {
      case "showHideNowaWiadomosc":
        this.setState({
          showHideListaWiadomosci: !this.state.showHideListaWiadomosci,
        });
        this.setState({
          showHideNowaWiadomosc: !this.state.showHideNowaWiadomosc,
        });
        break;
      case "showHideListaWiadomosci":
        this.setState({
          showHideListaWiadomosci: !this.state.showHideListaWiadomosci,
        });
        this.setState({
          showHideNowaWiadomosc: !this.state.showHideNowaWiadomosc,
        });
        break;
      default:
        this.setState({ showHideListaWiadomosci: true });
    }
  }

  render() {
    const { showHideListaWiadomosci, showHideNowaWiadomosc } = this.state;
    return (
      <Container className="Messages justify-content-md-center">
        <Row className="text-center">
          <div class="row gy-4">
            <div>
              <button
                type="button"
                onClick={() => this.hideComponent("showHideNowaWiadomosc")}
                class="btn btn-secondary"
              >
                Nowa wiadomość
              </button>
            </div>

            {showHideListaWiadomosci && <MessagesList />}
            {showHideNowaWiadomosc && <NewMessage />}
          </div>
        </Row>
      </Container>
    );
  }
}

export default Messages;
