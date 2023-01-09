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
  FormLabel,
  Alert,
  FormSelect,
  FormCheck,
} from "react-bootstrap";

import useAxios from "hooks/useAxios";

const RegisterActions = () => {
  const [isSupervisingTeacher, setIsSupervisingTeacher] = useState(false);
  const [registers, setRegisters] = useState([]);
  const [register, setRegister] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const getClasses = async () => {
    const classes = await axios.get("/api/v1/classes");
    setClasses(classes.data);
  };

  const getTeachers = async () => {
    const teachers = await axios.get("/api/v1/teachers");
    setTeachers(teachers.data);
  };

  const getSubjects = async () => {
    const subjects = await axios.get("/api/v1/subjects");
    setSubjects(subjects.data);
  };

  const getRegisters = async () => {
    const registers = await axios.get("/api/v1/registers");
    setRegisters(registers.data);
  };

  useEffect(() => {
    setErrMsg("");
  }, [isSupervisingTeacher]);

  const axios = useAxios();

  const handleAddRegister = async () => {
    try {
      const register = await axios.post(`/api/v1/registers/register`, {
        teacher_id: teacher.teacher_id,
        class_id: selectedClass.class_id,
        subject_id: subject.subject_id,
        is_supervising_teacher: isSupervisingTeacher,
      });
      console.log("Dodano dziennik o id: " + register.data.register_id);
      setSelectedClass(null);
      setSubject(null);
      setTeacher(null);
      setIsSupervisingTeacher(false);
      setErrMsg("");
    } catch (error) {
      setErrMsg("Nie udało się dodać dziennika.");
      console.log("Nie udało się dodać dziennika.");
    }
  };

  const handleEditRegister = async () => {
    try {
      await axios.put(`/api/v1/registers/register`, {
        register_id: register.register_id,
        teacher_id: teacher.teacher_id,
        class_id: selectedClass.class_id,
        subject_id: subject.subject_id,
        is_supervising_teacher: isSupervisingTeacher,
      });
      getRegisters();
      setRegister(null);
      setSelectedClass(null);
      setSubject(null);
      setTeacher(null);
      setIsSupervisingTeacher(false);
      setErrMsg("");
    } catch (error) {
      setErrMsg("Nie udało się edytować dziennika." + error);
    }
  };

  const handleDeleteRegister = async () => {
    try {
      await axios.delete(`/api/v1/registers/register/${register.register_id}`);
      console.log("Usunięto dziennik o id: " + register.register_id);
      getRegisters();
      setRegister(null);
      setSelectedClass(null);
      setSubject(null);
      setTeacher(null);
      setIsSupervisingTeacher(false);
      setErrMsg("");
    } catch (error) {
      setErrMsg("Nie udało się usunąć dziennika." + error);
    }
  };

  const handleChangeRegister = (event) => {
    const register = JSON.parse(event.target.value);
    if (event.target.value !== "-") {
      setRegister(register);
      setIsSupervisingTeacher(isSupervisingTeacher);
      classes.forEach((cl) => {
        if (cl.class_id === register.class_id) {
          setSelectedClass(cl);
        }
      });
      subjects.forEach((sub) => {
        if (sub.subject_id === register.subject_id) {
          setSubject(sub);
        }
      });
      teachers.forEach((teach) => {
        if (teach.teacher_id === register.teacher_id) {
          setTeacher(teach);
        }
      });
    } else {
      setRegister(null);
    }
  };

  const handleChangeClass = (event) => {
    if (event.target.value !== "-") {
      setSelectedClass(JSON.parse(event.target.value));
    } else {
      setSelectedClass(null);
    }
  };

  const handleChangeTeacher = (event) => {
    if (event.target.value !== "-") {
      setTeacher(JSON.parse(event.target.value));
    } else {
      setTeacher(null);
    }
  };

  const handleChangeSubject = (event) => {
    if (event.target.value !== "-") {
      setSubject(JSON.parse(event.target.value));
    } else {
      setSubject(null);
    }
  };

  const clearData = () => {
    setRegister(null);
    setSelectedClass(null);
    setSubject(null);
    setTeacher(null);
    setIsSupervisingTeacher(false);
    setErrMsg("");
  };

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Dzienniki</Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col>
              <Tabs
                defaultActiveKey="profile"
                id="justify-tab-example"
                justify
                onClick={clearData}
              >
                <Tab
                  eventKey="add-class"
                  title="Dodaj dziennik"
                  onEnter={() => {
                    clearData();
                    getClasses();
                    getTeachers();
                    getSubjects();
                  }}
                >
                  <Row className="justify-content-center">
                    <Col className="col-8 justify-content-center text-center">
                      <Form className="justify-content-center">
                        {errMsg && <Alert variant="danger">{errMsg}</Alert>}
                        <Row className="my-2 mt-4">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormSelect
                                onChange={(e) => handleChangeClass(e)}
                                value={JSON.stringify(selectedClass)}
                                required
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
                              <FormLabel>Klasa*:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="my-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormSelect
                                onChange={(e) => handleChangeTeacher(e)}
                                value={JSON.stringify(teacher)}
                                required
                              >
                                <option>-</option>
                                {teachers.map((tch) => (
                                  <option
                                    key={tch.teacher_id}
                                    value={JSON.stringify(tch)}
                                  >
                                    {tch.second_name} {tch.name}
                                  </option>
                                ))}
                              </FormSelect>
                              <FormLabel>Nauczyciel*:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="my-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormSelect
                                onChange={(e) => handleChangeSubject(e)}
                                value={JSON.stringify(subject)}
                                required
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
                              <FormLabel>Przedmiot*:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="my-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormCheck
                                type="checkbox"
                                label="Wychowawca"
                                required
                                onChange={(e) => setIsSupervisingTeacher(e)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row md={3} className="d-flex justify-content-center">
                          <Button onClick={handleAddRegister}>Dodaj</Button>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </Tab>
                <Tab
                  eventKey="delete-class"
                  title="Usuń dziennik"
                  onEnter={getRegisters}
                >
                  <Row className="justify-content-center">
                    <Col className="col-8 justify-content-center text-center">
                      <Form className="justify-content-center">
                        {errMsg && <Alert variant="danger">{errMsg}</Alert>}
                        <Row className="my-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormSelect
                                onChange={(e) => handleChangeRegister(e)}
                                value={JSON.stringify(register)}
                              >
                                <option>-</option>
                                {registers.map((reg) => (
                                  <option
                                    key={reg.register_id}
                                    value={JSON.stringify(reg)}
                                  >
                                    {reg.class} {reg.subject}
                                  </option>
                                ))}
                              </FormSelect>
                              <FormLabel>Dziennik:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row md={3} className="d-flex justify-content-center">
                          <Button
                            onClick={handleDeleteRegister}
                            disabled={!register}
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
                  title="Edytuj dziennik"
                  onEnter={() => {
                    getRegisters();
                    getClasses();
                    getTeachers();
                    getSubjects();
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
                                onChange={(e) => handleChangeRegister(e)}
                                value={JSON.stringify(register)}
                              >
                                <option>-</option>
                                {registers.map((reg) => (
                                  <option
                                    key={reg.register_id}
                                    value={JSON.stringify(reg)}
                                  >
                                    {reg.class} {reg.subject}
                                  </option>
                                ))}
                              </FormSelect>
                              <FormLabel>Dziennik:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="my-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormSelect
                                onChange={(e) => handleChangeClass(e)}
                                value={JSON.stringify(selectedClass)}
                                disabled={!register}
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
                        <Row className="my-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormSelect
                                onChange={(e) => handleChangeTeacher(e)}
                                value={JSON.stringify(teacher)}
                                disabled={!register}
                              >
                                <option>-</option>
                                {teachers.map((tch) => (
                                  <option
                                    key={tch.teacher_id}
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
                              <FormSelect
                                onChange={(e) => handleChangeSubject(e)}
                                value={JSON.stringify(subject)}
                                disabled={!register}
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
                              <FormCheck
                                type="checkbox"
                                label="Wychowawca"
                                value={isSupervisingTeacher}
                                disabled={!register}
                                onChange={(e) => setIsSupervisingTeacher(e)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row md={3} className="d-flex justify-content-center">
                          <Button onClick={handleEditRegister}>Edytuj</Button>
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

export default RegisterActions;
