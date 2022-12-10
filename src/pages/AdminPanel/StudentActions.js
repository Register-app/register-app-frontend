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

const StudentActions = () => {
  const [name, setName] = useState("");
  const [second_name, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [guardians, setGuardians] = useState([]);
  const [guardian, setGuardian] = useState([]);
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState(null);

  const getClasses = async () => {
    const classes = await axios.get("/api/v1/classes");
    setClasses(classes.data);
  };
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

  const handleAddStudent = () => {
    try {
      const user = axios.post(`/api/v1/users/user`, {
        name,
        second_name,
        email,
        password,
      });
      const student = axios.post(`/api/v1/students/student`, {
        user_id: user.data.user_id,
        class_id: selectedClass.class_id,
        guardian_id: guardian.user_id,
      });
      Alert.success(
        "Dodano ucznia: " + student.data.name + " " + student.data.second_name
      );
      setName("");
      setSecondName("");
      setEmail("");
      setPassword("");
      setGuardian([]);
      setErrMsg("");
    } catch (error) {
      setErrMsg("Nie udało się dodać ucznia.");
    }
  };

  const handleEditStudent = () => {
    try {
      axios.put(`/api/v1/users/user`, {
        user_id: student.user_id,
        name,
        second_name,
        email,
        password,
      });
      axios.put(`/api/v1/students/student`, {
        student_id: student.student_id,
        class_id: selectedClass.class_id,
        guardian_id: guardian.user_id,
      });
      Alert.success(
        "Edytowano ucznia: " +
          student.data.name +
          " " +
          student.data.second_name
      );
      setName("");
      setSecondName("");
      setEmail("");
      setPassword("");
      setGuardian([]);
      setErrMsg("");
    } catch (error) {
      setErrMsg("Nie udało się edytować ucznia.");
    }
  };

  const handleDeleteStudent = () => {
    try {
      axios.delete(`/api/v1/users/user`, {
        user_id: student.user_id,
      });
      axios.delete(`/api/v1/students/student`, {
        student_id: student.student_id,
      });
      Alert.success(
        "Usunięto ucznia: " + student.data.name + " " + student.data.second_name
      );
      setName("");
      setSecondName("");
      setEmail("");
      setPassword("");
      setGuardian([]);
      setErrMsg("");
    } catch (error) {
      setErrMsg("Nie udało się usunąć ucznia.");
    }
  };

  const handleChangeClass = (event) => {
    if (event.target.value !== "-") {
      setSelectedClass(JSON.parse(event.target.value));
    } else {
      setSelectedClass(null);
    }
  };

  const handleChangeGruardian = (event) => {
    const selectedValue = JSON.parse(event.target.value);
    if (
      guardian
        .map((grd) => JSON.stringify(grd))
        .includes(JSON.stringify(selectedValue))
    ) {
      setGuardian(
        guardian.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(selectedValue)
        )
      );
    } else {
      setGuardian([...guardian, selectedValue]);
    }
  };

  const handleChangeStudent = (event) => {
    const student = JSON.parse(event.target.value);
    if (event.target.value !== "-") {
      setStudent(student);
      classes.forEach((cl) => {
        if (cl.class_id === student.class_id) {
          setSelectedClass(cl);
        }
      });
      student.guardian_id.forEach((grd) => {
        guardians.forEach((grd2) => {
          if (grd2.guardian_id === grd) {
            setGuardian([...guardian, grd2]);
          }
        });
      });
    } else {
      setStudent(null);
      setSelectedClass(null);
      setGuardian([]);
    }
  };

  const clearData = () => {
    setName("");
    setSecondName("");
    setEmail("");
    setPassword("");
    setSelectedClass(null);
    setGuardian([]);
    setStudent(null);
    setErrMsg("");
  };

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
                onClick={clearData}
              >
                <Tab
                  eventKey="add-class"
                  title="Dodaj ucznia"
                  onEnter={() => {
                    getClasses();
                    getGuardians();
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
                        <Row className="mt-5 mb-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormSelect
                                onChange={(e) => handleChangeClass(e)}
                                value={JSON.stringify(selectedClass)}
                              >
                                <option>-</option>
                                {classes.map((cls) => (
                                  <option
                                    key={cls.class_id}
                                    value={JSON.stringify(cls)}
                                  >
                                    {cls.name} {cls.school_year}
                                  </option>
                                ))}
                              </FormSelect>
                              <FormLabel>Klasa:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col>
                            <InputGroup>
                              <InputGroup.Text>Opiekun:</InputGroup.Text>
                              <FormSelect
                                onChange={handleChangeGruardian}
                                value={guardian.map((guard) =>
                                  JSON.stringify(guard)
                                )}
                                multiple
                              >
                                {guardians.map((guard) => (
                                  <option
                                    key={guard.user_id}
                                    value={JSON.stringify(guard)}
                                  >
                                    {guard.second_name} {guard.name}
                                  </option>
                                ))}
                              </FormSelect>
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row md={3} className="d-flex justify-content-center">
                          <Button onClick={handleAddStudent}>Dodaj</Button>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </Tab>
                <Tab
                  eventKey="delete-class"
                  title="Usuń ucznia"
                  onEnter={getStudents}
                >
                  <Row className="justify-content-center">
                    <Col className="col-8 justify-content-center text-center">
                      <Form className="justify-content-center">
                        {errMsg && <Alert variant="danger">{errMsg}</Alert>}
                        <Row className="my-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormSelect
                                onChange={(e) => handleChangeStudent(e)}
                                value={JSON.stringify(student)}
                              >
                                <option>-</option>
                                {students.map((std) => (
                                  <option
                                    key={std.user_id}
                                    value={JSON.stringify(std)}
                                  >
                                    {std.second_name} {std.name}
                                  </option>
                                ))}
                              </FormSelect>
                              <FormLabel>Uczeń:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row md={3} className="d-flex justify-content-center">
                          <Button
                            onClick={handleDeleteStudent}
                            disabled={!student}
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
                  title="Edytuj ucznia"
                  onEnter={() => {
                    getStudents();
                    getClasses();
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
                                onChange={(e) => handleChangeStudent(e)}
                                value={JSON.stringify(student)}
                              >
                                <option>-</option>
                                {students.map((std) => (
                                  <option
                                    key={std.user_id}
                                    value={JSON.stringify(std)}
                                  >
                                    {std.second_name} {std.name}
                                  </option>
                                ))}
                              </FormSelect>
                              <FormLabel>Uczeń:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="my-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormControl
                                type="text"
                                placeholder="First name"
                                value={student?.name ? student.name : ""}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!student}
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
                                value={
                                  student?.second_name
                                    ? student.second_name
                                    : ""
                                }
                                onChange={(e) => setSecondName(e.target.value)}
                                disabled={!student}
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
                                value={student?.email ? student.email : ""}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={!student}
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
                                  disabled={!student}
                                  required
                                />

                                <FormLabel>Hasło:</FormLabel>
                              </FormGroup>
                              <Button
                                onClick={generatePassword}
                                disabled={!student}
                              >
                                <i className="fas fa-refresh"></i>
                              </Button>
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row className="mt-5 mb-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormSelect
                                onChange={(e) => handleChangeClass(e)}
                                value={JSON.stringify(selectedClass)}
                                disabled={!student}
                              >
                                <option>-</option>
                                {classes.map((cls) => (
                                  <option
                                    key={cls.class_id}
                                    value={JSON.stringify(cls)}
                                  >
                                    {cls.name} {cls.school_year}
                                  </option>
                                ))}
                              </FormSelect>
                              <FormLabel>Klasa:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col>
                            <InputGroup>
                              <InputGroup.Text>Opiekun:</InputGroup.Text>
                              <FormSelect
                                onChange={handleChangeGruardian}
                                value={guardian.map((guard) =>
                                  JSON.stringify(guard)
                                )}
                                multiple
                                disabled={!student}
                              >
                                {guardians.map((guard) => (
                                  <option
                                    key={guard.user_id}
                                    value={JSON.stringify(guard)}
                                  >
                                    {guard.second_name} {guard.name}
                                  </option>
                                ))}
                              </FormSelect>
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row md={3} className="d-flex justify-content-center">
                          <Button
                            onClick={handleEditStudent}
                            disabled={!student}
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

export default StudentActions;
