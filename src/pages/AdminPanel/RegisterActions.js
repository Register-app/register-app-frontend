import React from "react";
import { Accordion, Col, Row, Tab, Tabs } from "react-bootstrap";

const RegisterActions = () => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Dzienniki</Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col>
              <Tabs defaultActiveKey="profile" id="justify-tab-example" justify>
                <Tab eventKey="add-class" title="Dodaj dziennik">
                  <Row>
                    <Col>Dodaj dziennik</Col>
                  </Row>
                </Tab>
                <Tab eventKey="delete-class" title="Usuń dziennik">
                  <Row>
                    <Col>Usuń dziennik</Col>
                  </Row>
                </Tab>
                <Tab eventKey="edit-class" title="Edytuj dziennik">
                  <Row>
                    <Col>Edytuj dziennik</Col>
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

export default RegisterActions;
