import Header from "./components/Header"
import Summary from "./components/Summary"
import Footer from "./components/Footer";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="App">
      <Header/>
      <Summary/>
      {/* <Login/> */}
      <Footer/>
    </div>
  );
}

export default App;
