import React from "react";
import { Accordion, Col, Row, Tab, Tabs } from "react-bootstrap";

const ScheduleActions = () => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Harmonogramy</Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col>
              <Tabs
                defaultActiveKey="profile"
                id="justify-tab-example"
                className="mb-3"
                justify
              >
                <Tab eventKey="add-class" title="Dodaj harmonogram">
                  <Row>
                    <Col>Dodaj harmonogram</Col>
                  </Row>
                </Tab>
                <Tab eventKey="delete-class" title="Usuń harmonogram">
                  <Row>
                    <Col>Usuń harmonogram</Col>
                  </Row>
                </Tab>
                <Tab eventKey="edit-class" title="Edytuj harmonogram">
                  <Row>
                    <Col>Edytuj harmonogram</Col>
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

export default ScheduleActions;
