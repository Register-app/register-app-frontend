import React from "react";
import { Container, Row } from "react-bootstrap";
import StudentActions from "pages/AdminPanel/StudentActions";
import TeacherActions from "pages/AdminPanel/TeacherActions";
import "pages/AdminPanel/index.css";
import ClassActions from "pages/AdminPanel/ClassActions";
import SubjectActions from "pages/AdminPanel/SubjectActions";
import GuardianActions from "pages/AdminPanel/GuardianActions";
import RegisterActions from "pages/AdminPanel/RegisterActions";
import ScheduleActions from "./ScheduleActions";

const AdminPanel = () => {
  return (
    <Container className="AdminPanel justify-content-center mt-2">
      <Row>
        <h1 className="d-flex justify-content-center">Panel Administratora</h1>
      </Row>
      <Row>
        <StudentActions />
      </Row>
      <Row>
        <TeacherActions />
      </Row>
      <Row>
        <GuardianActions />
      </Row>
      <Row>
        <ClassActions />
      </Row>
      <Row>
        <SubjectActions />
      </Row>
      <Row>
        <ScheduleActions />
      </Row>
      <Row>
        <RegisterActions />
      </Row>
    </Container>
  );
};

export default AdminPanel;
