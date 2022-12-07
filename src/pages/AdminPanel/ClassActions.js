import React from "react";
import { Accordion, Col, Row, Tab, Tabs } from "react-bootstrap";

const ClassActions = () => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Klasy</Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col>
              <Tabs
                defaultActiveKey="profile"
                id="justify-tab-example"
                className="mb-3"
                justify
              >
                <Tab eventKey="add-class" title="Dodaj klasę">
                  <Row>
                    <Col></Col>
                  </Row>
                </Tab>
                <Tab eventKey="delete-class" title="Usuń klasę">
                  <Row>
                    <Col></Col>
                  </Row>
                </Tab>
                <Tab eventKey="edit-class" title="Edytuj klasę">
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

export default ClassActions;
