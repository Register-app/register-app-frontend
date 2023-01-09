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

const GuardianActions = () => {
  const [name, setName] = useState("");
  const [second_name, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [guardians, setGuardians] = useState([]);
  const [guardian, setGuardian] = useState(null);
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState([]);

  const getGuardians = async () => {
    const guardians = await axios.get("/api/v1/guardians");
    setGuardians(guardians.data);
  };
  const getStudents = async () => {
    const students = await axios.get("/api/v1/students");
    setStudents(students.data);
  };

  useEffect(() => {
    setErrMsg("");
  }, [name, second_name, email, password]);

  const axios = useAxios();

  const generatePassword = () => {
    setPassword(Math.random().toString(36).slice(-8));
  };

  const handleAddGuardian = async () => {
    try {
      const user = await axios.post(`/api/v1/users/user`, {
        name,
        second_name,
        email,
        password,
      });
      const guardian = await axios.post(`/api/v1/guardians/guardian`, {
        user_id: user.data.user_id,
        student_id: student.map((std) => std.student_id),
      });
      console.log(
        "Dodano opiekuna: " +
          user.data.name +
          " " +
          user.data.second_name +
          " o id opiekuna: " +
          guardian.data.guardian_id
      );
      setName("");
      setSecondName("");
      setEmail("");
      setPassword("");
      setStudent([]);
      setErrMsg("");
    } catch (error) {
      setErrMsg("Nie udało się dodać opiekuna.");
      console.log("Nie udało się dodać opiekuna.");
    }
  };

  const handleEditGuardian = async () => {
    try {
      await axios.put(`/api/v1/users/user`, {
        user_id: guardian.user_id,
        name,
        second_name,
        email,
        password,
      });
      await axios.put(`/api/v1/guardians/guardian`, {
        guardian_id: guardian.guardian_id,
        student_id: student.map((std) => std.student_id),
      });
      getGuardians();
      setGuardian(null);
      setName("");
      setSecondName("");
      setEmail("");
      setPassword("");
      setStudent([]);
      setErrMsg("");
    } catch (error) {
      setErrMsg("Nie udało się edytować opiekuna." + error);
    }
  };

  const handleDeleteGuardian = async () => {
    try {
      await axios.delete(`/api/v1/guardians/guardian/${guardian.guardian_id}`);
      await axios.delete(`/api/v1/users/user/${guardian.user_id}`);
      console.log(
        "Usunięto opiekuna: " +
          student.name +
          " " +
          student.second_name +
          " o id opiekuna: " +
          guardian.guardian_id
      );
      getGuardians();
      setGuardian(null);
      setName("");
      setSecondName("");
      setEmail("");
      setPassword("");
      setStudent([]);
      setErrMsg("");
    } catch (error) {
      setErrMsg("Nie udało się usunąć opiekuna." + error);
    }
  };

  const handleChangeStudent = (event) => {
    const selectedValue = JSON.parse(event.target.value);
    if (
      student
        .map((std) => JSON.stringify(std))
        .includes(JSON.stringify(selectedValue))
    ) {
      setStudent(
        student.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(selectedValue)
        )
      );
    } else {
      setStudent([...student, selectedValue]);
    }
  };

  const handleChangeGuardian = (event) => {
    const guardian = JSON.parse(event.target.value);
    if (event.target.value !== "-") {
      setGuardian(guardian);
      let tempStudent = [];
      guardian.student_id.forEach((std) => {
        students.forEach((std2) => {
          if (std2.student_id === std) {
            tempStudent.push(std2);
          }
        });
      });
      setStudent(tempStudent);
      setName(guardian.name);
      setSecondName(guardian.second_name);
      setEmail(guardian.email);
    } else {
      setGuardian(null);
      setStudent([]);
    }
  };

  const clearData = () => {
    setName("");
    setSecondName("");
    setEmail("");
    setPassword("");
    setStudent([]);
    setGuardian(null);
    setErrMsg("");
  };

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Opiekunowie</Accordion.Header>
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
                  title="Dodaj opiekuna"
                  onEnter={() => {
                    getStudents();
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
                        <Row className="mb-2">
                          <Col>
                            <InputGroup>
                              <InputGroup.Text>Uczeń:</InputGroup.Text>
                              <FormSelect
                                onChange={handleChangeStudent}
                                value={student.map((stud) =>
                                  JSON.stringify(stud)
                                )}
                                multiple
                              >
                                {students.map((stud) => (
                                  <option
                                    key={stud.user_id}
                                    value={JSON.stringify(stud)}
                                  >
                                    {stud.second_name} {stud.name}
                                  </option>
                                ))}
                              </FormSelect>
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row md={3} className="d-flex justify-content-center">
                          <Button onClick={handleAddGuardian}>Dodaj</Button>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </Tab>
                <Tab
                  eventKey="delete-class"
                  title="Usuń opiekuna"
                  onEnter={getGuardians}
                >
                  <Row className="justify-content-center">
                    <Col className="col-8 justify-content-center text-center">
                      <Form className="justify-content-center">
                        {errMsg && <Alert variant="danger">{errMsg}</Alert>}
                        <Row className="my-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormSelect
                                onChange={(e) => handleChangeGuardian(e)}
                                value={JSON.stringify(guardian)}
                              >
                                <option>-</option>
                                {guardians.map((grd) => (
                                  <option
                                    key={grd.user_id}
                                    value={JSON.stringify(grd)}
                                  >
                                    {grd.second_name} {grd.name}
                                  </option>
                                ))}
                              </FormSelect>
                              <FormLabel>Opiekun:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row md={3} className="d-flex justify-content-center">
                          <Button
                            onClick={handleDeleteGuardian}
                            disabled={!guardian}
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
                  title="Edytuj opiekuna"
                  onEnter={() => {
                    getStudents();
                    getGuardians();
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
                                onChange={(e) => handleChangeGuardian(e)}
                                value={JSON.stringify(guardian)}
                              >
                                <option>-</option>
                                {guardians.map((grd) => (
                                  <option
                                    key={grd.user_id}
                                    value={JSON.stringify(grd)}
                                  >
                                    {grd.second_name} {grd.name}
                                  </option>
                                ))}
                              </FormSelect>
                              <FormLabel>Opiekun:</FormLabel>
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
                                disabled={!guardian}
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
                                disabled={!guardian}
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
                                disabled={!guardian}
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
                                  disabled={!guardian}
                                  required
                                />

                                <FormLabel>Hasło:</FormLabel>
                              </FormGroup>
                              <Button
                                onClick={generatePassword}
                                disabled={!guardian}
                              >
                                <i className="fas fa-refresh"></i>
                              </Button>
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col>
                            <InputGroup>
                              <InputGroup.Text>Uczeń:</InputGroup.Text>
                              <FormSelect
                                onChange={handleChangeStudent}
                                value={student.map((stud) =>
                                  JSON.stringify(stud)
                                )}
                                multiple
                                disabled={!guardian}
                              >
                                {students.map((stud) => (
                                  <option
                                    key={stud.user_id}
                                    value={JSON.stringify(stud)}
                                  >
                                    {stud.second_name} {stud.name}
                                  </option>
                                ))}
                              </FormSelect>
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row md={3} className="d-flex justify-content-center">
                          <Button
                            onClick={handleEditGuardian}
                            disabled={!guardian}
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

export default GuardianActions;
