import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./index.css";

import NotFound from "components/auth/NotFound";
import RequireAuth from "components/auth/RequireAuth";
import Unauthorized from "components/auth/Unauthorized";
import Footer from "components/footer";
import Header from "components/header";
import Layout from "components/layout";
import Navigation from "components/navigation";
import { GradesProvider } from "context/GradesProvider";
import { MessagesProvider } from "context/MessagesProvider";
import Attendances from "pages/Attendances";
import AddFrequency from "pages/Attendances/AddFrequency";
import Grades from "pages/Grades";
import AddGrade from "pages/Grades/AddGrade";
import Login from "pages/Login";
import Messages from "pages/Messages";
import Schedule from "pages/Schedule";
import Summary from "pages/Summary";
import Timetable from "pages/Timetable";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { user } = useAuth();

  return (
    <div className="App">
      <Header />
      {user && <Navigation />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route element={<RequireAuth allowedRoles={["ROLE_USER"]} />}>
            <Route path="/" element={<Summary />} />
            <Route path="lesson-plan" element={<Schedule />} />
            <Route
              path="grades"
              element={
                <GradesProvider>
                  <Grades />
                </GradesProvider>
              }
            />
            <Route path="addgrade" element={<AddGrade />} />
            <Route path="addfrequency" element={<AddFrequency />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="frequency" element={<Attendances />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="messages"
              element={
                <MessagesProvider>
                  <Messages />
                </MessagesProvider>
              }
            />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
