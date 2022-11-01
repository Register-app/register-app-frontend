import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import Header from "components/Header";
import Summary from "pages/Summary";
import Footer from "components/Footer";
import Login from "components/Login";
import ButtonRow from "components/ButtonRow";
import LessonPlan from "pages/LessonPlan";
import Frequency from "pages/Frequency";
import AddFrequency from "pages/AddFrequency";
import Messages from "pages/Messages";
import Grades from "pages/Grades";
import Timetable from "pages/Timetable";
import Logout from "components/Logout";
import AddGrade from "pages/AddGrade";

const App = () => {
  return (
    <div className="App">
      <Header />
      <ButtonRow />
      <Routes>
        <Route path="/" element={<Summary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lesson-plan" element={<LessonPlan />} />
        <Route path="/grades" element={<AddGrade />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/frequency" element={<AddFrequency />} />
        <Route path="/addfrequency" element={<AddFrequency />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
