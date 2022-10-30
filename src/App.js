import Header from "./components/Header"
import Summary from "./components/Summary"
import Footer from "./components/Footer";
import Login from "./components/Login";
import PlanZajec from "./components/PlanZajec";
import Frekwencja from "./components/Frekwencja";
import { Component } from "react";
import {Row, Col} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      showHideSummary: true,
      showHideLogin: false,
      showHidePlanZajec: false,
      showHideFrekwencja: false
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
        this.setState({ showHideSummary: !this.state.showHideSummary });
        this.setState({ showHideFrekwencja: false });
        this.setState({ showHidePlanZajec: false });
        this.setState({ showHideLogin: !this.state.showHideLogin });
        break;
      case "showHidePlanZajec":
        this.setState({ showHideSummary: false });
        this.setState({ showHideFrekwencja: false });
        this.setState({ showHidePlanZajec: true });
        this.setState({ showHideLogin: false });
        break;
      case "showHideFrekwencja":
        this.setState({ showHideSummary: false });
        this.setState({ showHidePlanZajec: false });
        this.setState({ showHideLogin: false });
        this.setState({ showHideFrekwencja: true });
        break;
      default:
        this.setState({ showHideSummary: true });
    }
  }

  render() {
    const { showHideSummary, showHideLogin, showHidePlanZajec, showHideFrekwencja } = this.state;
    return (
      <div class="row gy-4"> 
        <Header/>
      <Row>
        <div id='przyciski' class="row gy-3 "> 
        <Col className='col-md-1'></Col>
          <Col><button type="button" onClick={() => this.hideComponent("showHidePlanZajec")}  class="btn btn-primary">Plan zajęć</button></Col>
          <Col><button type="button" onClick={() => this.hideComponent("showHideLogin")}  class="btn btn-danger">Oceny</button></Col>
          <Col><button type="button" onClick={() => this.hideComponent("showHidePlanZajec")} class="btn btn-success">Terminarz</button></Col>
          <Col><button type="button" onClick={() => this.hideComponent("showHidePlanZajec")} class="btn btn-warning">Wiadomości</button></Col>
          <Col><button type="button" onClick={() => this.hideComponent("showHideFrekwencja")} class="btn btn-info">Frekwencja</button></Col>
          </div>
        </Row>
        <Row>
          <div>
          {showHideSummary && <Summary />}
          {showHideLogin && <Login />}
          {showHidePlanZajec && <PlanZajec />}
          {showHideFrekwencja && <Frekwencja />}
          </div>
          </Row>
        <Footer/>
        </div>
    );
  }
}

export default App;
