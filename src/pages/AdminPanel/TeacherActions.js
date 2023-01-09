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
  InputGroup,
  FormSelect,
} from "react-bootstrap";

import useAxios from "hooks/useAxios";

const TeacherActions = () => {
  const [name, setName] = useState("");
  const [second_name, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState(null);

  const getTeachers = async () => {
    const teachers = await axios.get("/api/v1/teachers");
    setTeachers(teachers.data);
  };

  useEffect(() => {
    setErrMsg("");
  }, [name, second_name, email, password]);

  const axios = useAxios();

  const generatePassword = () => {
    setPassword(Math.random().toString(36).slice(-8));
  };

  const handleAddTeacher = async () => {
    try {
      const user = await axios.post(`/api/v1/users/user`, {
        name,
        second_name,
        email,
        password,
      });
      const teacher = await axios.post(`/api/v1/teachers/teacher`, {
        user_id: user.data.user_id,
      });
      console.log(
        "Dodano nauczyciela: " +
          user.data.name +
          " " +
          user.data.second_name +
          " o id nauczyciela: " +
          teacher.data.teacher_id
      );
      setName("");
      setSecondName("");
      setEmail("");
      setPassword("");
      setErrMsg("");
    } catch (error) {
      setErrMsg("Nie udało się dodać opiekuna.");
      console.log("Nie udało się dodać opiekuna.");
    }
  };

  const handleEditTeacher = async () => {
    try {
      await axios.put(`/api/v1/users/user`, {
        user_id: teacher.user_id,
        name,
        second_name,
        email,
        password,
      });
      await axios.put(`/api/v1/guardians/guardian`, {
        teacher_id: teacher.teacher_id,
      });
      getTeachers();
      setTeacher(null);
      setName("");
      setSecondName("");
      setEmail("");
      setPassword("");
      setErrMsg("");
    } catch (error) {
      setErrMsg("Nie udało się edytować nauczyciela." + error);
    }
  };

  const handleDeleteTeacher = async () => {
    try {
      await axios.delete(`/api/v1/teachers/teacher/${teacher.teacher_id}`);
      await axios.delete(`/api/v1/users/user/${teacher.user_id}`);
      console.log(
        "Usunięto nauczyciela: " +
          teacher.name +
          " " +
          teacher.second_name +
          " o id nauczyciela: " +
          teacher.teacher_id
      );
      getTeachers();
      setTeacher(null);
      setName("");
      setSecondName("");
      setEmail("");
      setPassword("");
      setErrMsg("");
    } catch (error) {
      setErrMsg("Nie udało się usunąć nauczyciela." + error);
    }
  };

  const handleChangeTeacher = (event) => {
    const teacher = JSON.parse(event.target.value);
    if (event.target.value !== "-") {
      setTeacher(teacher);
      setName(teacher.name);
      setSecondName(teacher.second_name);
      setEmail(teacher.email);
    } else {
      setTeacher(null);
    }
  };

  const clearData = () => {
    setName("");
    setSecondName("");
    setEmail("");
    setPassword("");
    setTeacher(null);
    setErrMsg("");
  };

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
                onClick={clearData}
              >
                <Tab
                  eventKey="add-class"
                  title="Dodaj nauczyciela"
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
                                placeholder="First name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                              />
                              <FormLabel>Imię*:</FormLabel>
                            </FormGroup>
                          </Col>
                          <Col>
                            <FormGroup className="form-floating">
                              <FormControl
                                type="text"
                                placeholder="Second name"
                                value={second_name}
                                onChange={(e) => setSecondName(e.target.value)}
                                required
                              />
                              <FormLabel>Nazwisko*:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormControl
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                              <FormLabel>Email*:</FormLabel>
                            </FormGroup>
                          </Col>
                          <Col>
                            <InputGroup>
                              <FormGroup className="form-floating">
                                <FormControl
                                  type="text"
                                  placeholder="Password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  required
                                />

                                <FormLabel>Hasło*:</FormLabel>
                              </FormGroup>
                              <Button onClick={generatePassword}>
                                <i className="fas fa-refresh"></i>
                              </Button>
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row md={3} className="d-flex justify-content-center">
                          <Button onClick={handleAddTeacher}>Dodaj</Button>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </Tab>
                <Tab
                  eventKey="delete-class"
                  title="Usuń opiekuna"
                  onEnter={getTeachers}
                >
                  <Row className="justify-content-center">
                    <Col className="col-8 justify-content-center text-center">
                      <Form className="justify-content-center">
                        {errMsg && <Alert variant="danger">{errMsg}</Alert>}
                        <Row className="my-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormSelect
                                onChange={(e) => handleChangeTeacher(e)}
                                value={JSON.stringify(teacher)}
                              >
                                <option>-</option>
                                {teachers.map((tch) => (
                                  <option
                                    key={tch.user_id}
                                    value={JSON.stringify(tch)}
                                  >
                                    {tch.second_name} {tch.name}
                                  </option>
                                ))}
                              </FormSelect>
                              <FormLabel>Nauczyciel:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row md={3} className="d-flex justify-content-center">
                          <Button
                            onClick={handleDeleteTeacher}
                            disabled={!teacher}
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
                  title="Edytuj nauczyciela"
                  onEnter={() => {
                    getTeachers();
                  }}
                >
                  <Row className="justify-content-center">
                    <Col className="col-8 justify-content-center text-center">
                      <Form className="justify-content-center">
                        {errMsg && <Alert variant="danger">{errMsg}</Alert>}
                        <Row className="my-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormSelect
                                onChange={(e) => handleChangeTeacher(e)}
                                value={JSON.stringify(teacher)}
                              >
                                <option>-</option>
                                {teachers.map((tch) => (
                                  <option
                                    key={tch.user_id}
                                    value={JSON.stringify(tch)}
                                  >
                                    {tch.second_name} {tch.name}
                                  </option>
                                ))}
                              </FormSelect>
                              <FormLabel>Nauczyciel:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="my-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormControl
                                type="text"
                                placeholder="First name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!teacher}
                                required
                              />
                              <FormLabel>Imię:</FormLabel>
                            </FormGroup>
                          </Col>
                          <Col>
                            <FormGroup className="form-floating">
                              <FormControl
                                type="text"
                                placeholder="Second name"
                                value={second_name}
                                onChange={(e) => setSecondName(e.target.value)}
                                disabled={!teacher}
                                required
                              />
                              <FormLabel>Nazwisko:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormControl
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={!teacher}
                                required
                              />
                              <FormLabel>Email:</FormLabel>
                            </FormGroup>
                          </Col>

                          <Col>
                            <InputGroup>
                              <FormGroup className="form-floating">
                                <FormControl
                                  type="text"
                                  placeholder="Password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  disabled={!teacher}
                                  required
                                />

                                <FormLabel>Hasło:</FormLabel>
                              </FormGroup>
                              <Button
                                onClick={generatePassword}
                                disabled={!teacher}
                              >
                                <i className="fas fa-refresh"></i>
                              </Button>
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row md={3} className="d-flex justify-content-center">
                          <Button
                            onClick={handleEditTeacher}
                            disabled={!teacher}
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

export default TeacherActions;
