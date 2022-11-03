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
import Messages from "pages/Messages";
import Grades from "pages/Grades";
import Timetable from "pages/Timetable";
import NotFound from "components/NotFound";
import Unauthorized from "components/Unauthorized";
import Layout from "components/Layout";
import RequireAuth from "components/RequireAuth";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { auth } = useAuth();

  return (
    <div className="App">
      <Header />
      {auth && <ButtonRow />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route element={<RequireAuth allowedRoles={["USER"]} />}>
            <Route path="/" element={<Summary />} />
            <Route path="lesson-plan" element={<LessonPlan />} />
            <Route path="grades" element={<Grades />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="messages" element={<Messages />} />
            <Route path="frequency" element={<Frequency />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
