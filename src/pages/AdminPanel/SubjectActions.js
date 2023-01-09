import React, { useEffect, useState } from "react";
import {
  Accordion,
  Col,
  Row,
  Tab,
  Tabs,
  Form,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Alert,
  FormSelect,
} from "react-bootstrap";

import useAxios from "hooks/useAxios";

const SubjectActions = () => {
  const [name, setName] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState(null);

  const getSubjects = async () => {
    const subjects = await axios.get("/api/v1/subjects");
    setSubjects(subjects.data);
  };

  useEffect(() => {
    setErrMsg("");
  }, [name]);

  const axios = useAxios();

  const handleAddSubject = async () => {
    try {
      const subject = await axios.post(`/api/v1/subjects/subject`, {
        name,
      });
      console.log(
        "Dodano przedmiot: " +
          subject.data.name +
          " o id: " +
          subject.data.subject_id
      );
      setName("");
      setErrMsg("");
    } catch (error) {
      setErrMsg("Nie udało się dodać przedmiotu.");
      console.log("Nie udało się dodać przedmiotu.");
    }
  };

  const handleEditSubject = async () => {
    try {
      await axios.put(`/api/v1/subjects/subject`, {
        subject_id: subject.subject_id,
        name,
      });
      getSubjects();
      setSubject(null);
      setName("");
      setErrMsg("");
    } catch (error) {
      setErrMsg("Nie udało się edytować przedmiotu." + error);
    }
  };

  const handleDeleteSubject = async () => {
    try {
      await axios.delete(`/api/v1/subjects/subject/${subject.subject_id}`);
      console.log(
        "Usunięto przedmiot: " + subject.name + " o id: " + subject.subject_id
      );
      getSubjects();
      setSubject(null);
      setName("");
      setErrMsg("");
    } catch (error) {
      setErrMsg("Nie udało się usunąć przedmiotu." + error);
    }
  };

  const handleChangeSubject = (event) => {
    const subject = JSON.parse(event.target.value);
    if (event.target.value !== "-") {
      setSubject(subject);
      setName(subject.name);
    } else {
      setSubject(null);
    }
  };

  const clearData = () => {
    setName("");
    setSubject(null);
    setErrMsg("");
  };

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
                onClick={clearData}
              >
                <Tab
                  eventKey="add-class"
                  title="Dodaj przedmiot"
                  onEnter={() => {
                    clearData();
                  }}
                >
                  <Row className="justify-content-center">
                    <Col className="col-8 justify-content-center text-center">
                      <Form className="justify-content-center">
                        {errMsg && <Alert variant="danger">{errMsg}</Alert>}
                        <Row className="my-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormControl
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                              />
                              <FormLabel>Nazwa*:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row md={3} className="d-flex justify-content-center">
                          <Button onClick={handleAddSubject}>Dodaj</Button>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </Tab>
                <Tab
                  eventKey="delete-class"
                  title="Usuń przedmiot"
                  onEnter={getSubjects}
                >
                  <Row className="justify-content-center">
                    <Col className="col-8 justify-content-center text-center">
                      <Form className="justify-content-center">
                        {errMsg && <Alert variant="danger">{errMsg}</Alert>}
                        <Row className="my-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormSelect
                                onChange={(e) => handleChangeSubject(e)}
                                value={JSON.stringify(subject)}
                              >
                                <option>-</option>
                                {subjects.map((sub) => (
                                  <option
                                    key={sub.subject_id}
                                    value={JSON.stringify(sub)}
                                  >
                                    {sub.name}
                                  </option>
                                ))}
                              </FormSelect>
                              <FormLabel>Przedmiot:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row md={3} className="d-flex justify-content-center">
                          <Button
                            onClick={handleDeleteSubject}
                            disabled={!subject}
                          >
                            Usuń
                          </Button>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </Tab>
                <Tab
                  eventKey="edit-class"
                  title="Edytuj przedmiot"
                  onEnter={getSubjects}
                >
                  <Row className="justify-content-center">
                    <Col className="col-8 justify-content-center text-center">
                      <Form className="justify-content-center">
                        {errMsg && <Alert variant="danger">{errMsg}</Alert>}
                        <Row className="my-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormSelect
                                onChange={(e) => handleChangeSubject(e)}
                                value={JSON.stringify(subject)}
                              >
                                <option>-</option>
                                {subjects.map((sub) => (
                                  <option
                                    key={sub.subject_id}
                                    value={JSON.stringify(sub)}
                                  >
                                    {sub.name}
                                  </option>
                                ))}
                              </FormSelect>
                              <FormLabel>Przedmiot:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="my-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormControl
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!subject}
                                required
                              />
                              <FormLabel>Nazwa:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row md={3} className="d-flex justify-content-center">
                          <Button
                            onClick={handleEditSubject}
                            disabled={!subject}
                          >
                            Edytuj
                          </Button>
                        </Row>
                      </Form>
                    </Col>
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
