import React from "react";
import { Accordion, Col, Row, Tab, Tabs } from "react-bootstrap";

const StudentActions = () => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Uczniowie</Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col>
              <Tabs
                defaultActiveKey="profile"
                id="justify-tab-example"
                className="mb-3"
                justify
              >
                <Tab eventKey="add-class" title="Dodaj ucznia">
                  <Row>
                    <Col></Col>
                  </Row>
                </Tab>
                <Tab eventKey="delete-class" title="Usuń ucznia">
                  <Row>
                    <Col></Col>
                  </Row>
                </Tab>
                <Tab eventKey="edit-class" title="Edytuj ucznia">
                  <Row>
                    <Col></Col>
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

export default StudentActions;
