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
import { AttendancesProvider } from "context/AttendancesProvider";
import { MessagesProvider } from "context/MessagesProvider";
import Attendances from "pages/Attendances";
import Grades from "pages/Grades";
import Login from "pages/Login";
import Messages from "pages/Messages";
import Schedule from "pages/Schedule";
import Summary from "pages/Summary";
import Timetable from "pages/Timetable";
import useAuth from "./hooks/useAuth";
import { checkRoles } from "utils/checkRoles";

const App = () => {
  const { user } = useAuth();

  return (
    <div className="App">
      <Header />
      {checkRoles(user, ["ROLE_USER"]) && <Navigation />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route
            element={<RequireAuth user={user} allowedRoles={["ROLE_USER"]} />}
          >
            <Route path="/" element={<Summary />} />
            <Route path="lesson-plan" element={<Schedule />} />
            <Route path="timetable" element={<Timetable />} />
            <Route
              path="grades"
              element={
                <GradesProvider>
                  <Grades />
                </GradesProvider>
              }
            />
            <Route
              path="attendances"
              element={
                <AttendancesProvider>
                  <Attendances />
                </AttendancesProvider>
              }
            />
            <Route path="timetable" element={<Timetable />} />
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
