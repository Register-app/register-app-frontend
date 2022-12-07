import React from "react";
import { Accordion, Col, Row, Tab, Tabs } from "react-bootstrap";

const TeacherActions = () => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Nauczyciele</Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col>
              <Tabs
                defaultActiveKey="profile"
                id="justify-tab-example"
                className="mb-3"
                justify
              >
                <Tab eventKey="add-class" title="Dodaj nauczyciela">
                  <Row>
                    <Col>Dodaj nauczyciela</Col>
                  </Row>
                </Tab>
                <Tab eventKey="delete-class" title="Usuń nauczyciela">
                  <Row>
                    <Col>Usuń nauczyciela</Col>
                  </Row>
                </Tab>
                <Tab eventKey="edit-class" title="Edytuj nauczyciela">
                  <Row>
                    <Col>Edytuj nauczyciela</Col>
                  </Row>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default TeacherActions;
