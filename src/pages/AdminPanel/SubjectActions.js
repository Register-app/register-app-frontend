import React from "react";
import { Accordion, Col, Row, Tab, Tabs } from "react-bootstrap";

const SubjectActions = () => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Przedmioty</Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col>
              <Tabs
                defaultActiveKey="profile"
                id="justify-tab-example"
                className="mb-3"
                justify
              >
                <Tab eventKey="add-class" title="Dodaj przedmiot">
                  <Row>
                    <Col>Dodaj przedmiot</Col>
                  </Row>
                </Tab>
                <Tab eventKey="delete-class" title="Usuń przedmiot">
                  <Row>
                    <Col>Usuń przedmiot</Col>
                  </Row>
                </Tab>
                <Tab eventKey="edit-class" title="Edytuj przedmiot">
                  <Row>
                    <Col>Edytuj przedmiot</Col>
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

export default SubjectActions;
