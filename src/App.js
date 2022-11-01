import Header from "./components/Header";
import Summary from "./components/Summary";
import Footer from "./components/Footer";
import Login from "./components/Login";
import PlanZajec from "./components/PlanZajec";
import Frekwencja from "./components/Frekwencja";
import Wiadomosci from "./components/Wiadomosci";
import Oceny from "./components/Oceny";
import Terminarz from "./components/Terminarz";
import { Component } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      showHideSummary: true,
      showHideLogin: false,
      showHidePlanZajec: false,
      showHideFrekwencja: false,
      showHideWiadomosci: false,
      showHideOceny: false,
      showHideTerminarz: false,
    };
    this.hideComponent = this.hideComponent.bind(this);
  }

  hideComponent(name) {
    console.log(name);
    switch (name) {
      // case "showHideSummary":
      //   this.setState({ showHideSummary: !this.state.showHideSummary });
      //   break;
      case "showHideLogin":
        this.setState({ showHideSummary: false });
        this.setState({ showHideFrekwencja: false });
        this.setState({ showHidePlanZajec: false });
        this.setState({ showHideLogin: true });
        this.setState({ showHideTerminarz: false });
        this.setState({ showHideOceny: false });
        this.setState({ showHideWiadomosci: false });
        break;
      case "showHidePlanZajec":
        this.setState({ showHideSummary: false });
        this.setState({ showHideFrekwencja: false });
        this.setState({ showHidePlanZajec: true });
        this.setState({ showHideLogin: false });
        this.setState({ showHideTerminarz: false });
        this.setState({ showHideOceny: false });
        this.setState({ showHideWiadomosci: false });
        break;
      case "showHideFrekwencja":
        this.setState({ showHideSummary: false });
        this.setState({ showHidePlanZajec: false });
        this.setState({ showHideLogin: false });
        this.setState({ showHideFrekwencja: true });
        this.setState({ showHideTerminarz: false });
        this.setState({ showHideOceny: false });
        this.setState({ showHideWiadomosci: false });
        break;
      case "showHideWiadomosci":
        this.setState({ showHideSummary: false });
        this.setState({ showHidePlanZajec: false });
        this.setState({ showHideLogin: false });
        this.setState({ showHideFrekwencja: false });
        this.setState({ showHideWiadomosci: true });
        this.setState({ showHideTerminarz: false });
        this.setState({ showHideOceny: false });
        break;
      case "showHideOceny":
        this.setState({ showHideSummary: false });
        this.setState({ showHidePlanZajec: false });
        this.setState({ showHideLogin: false });
        this.setState({ showHideFrekwencja: false });
        this.setState({ showHideWiadomosci: false });
        this.setState({ showHideTerminarz: false });
        this.setState({ showHideOceny: true });
        break;
      case "showHideTerminarz":
        this.setState({ showHideSummary: false });
        this.setState({ showHidePlanZajec: false });
        this.setState({ showHideLogin: false });
        this.setState({ showHideFrekwencja: false });
        this.setState({ showHideWiadomosci: false });
        this.setState({ showHideTerminarz: true });
        this.setState({ showHideOceny: false });
        break;
      default:
        this.setState({ showHideSummary: true });
    }
  }

  render() {
    const {
      showHideSummary,
      showHideLogin,
      showHidePlanZajec,
      showHideFrekwencja,
      showHideWiadomosci,
      showHideOceny,
      showHideTerminarz,
    } = this.state;
    return (
      <div class="row gy-4">
        <Header />
        <Row>
          <div id="przyciski" class="row gy-3 ">
            <Col className="col-md-1"></Col>
            <Col>
              <button
                type="button"
                onClick={() => this.hideComponent("showHidePlanZajec")}
                class="btn btn-primary"
              >
                Plan zajęć
              </button>
            </Col>
            <Col>
              <button
                type="button"
                onClick={() => this.hideComponent("showHideOceny")}
                class="btn btn-danger"
              >
                Oceny
              </button>
            </Col>
            <Col>
              <button
                type="button"
                onClick={() => this.hideComponent("showHideTerminarz")}
                class="btn btn-success"
              >
                Terminarz
              </button>
            </Col>
            <Col>
              <button
                type="button"
                onClick={() => this.hideComponent("showHideWiadomosci")}
                class="btn btn-warning"
              >
                Wiadomości
              </button>
            </Col>
            <Col>
              <button
                type="button"
                onClick={() => this.hideComponent("showHideFrekwencja")}
                class="btn btn-info"
              >
                Frekwencja
              </button>
            </Col>
          </div>
        </Row>
        <Row>
          <div>
            {showHideSummary && <Summary />}
            {showHideLogin && <Login />}
            {showHidePlanZajec && <PlanZajec />}
            {showHideFrekwencja && <Frekwencja />}
            {showHideWiadomosci && <Wiadomosci />}
            {showHideOceny && <Oceny />}
            {showHideTerminarz && <Terminarz />}
          </div>
        </Row>
        <Footer />
      </div>
    );
  }
}

export default App;
