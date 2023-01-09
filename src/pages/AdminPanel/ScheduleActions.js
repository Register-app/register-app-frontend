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

const ScheduleActions = () => {
  const [date, setDate] = useState("");
  const [weeks, setWeeks] = useState(0);
  const [comment, setComment] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [registers, setRegisters] = useState([]);
  const [register, setRegister] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const [scheduleTypes, setScheduleTypes] = useState([]);
  const [scheduleType, setScheduleType] = useState(null);

  const getSchedules = async () => {
    const schedules = await axios.get("/api/v1/schedules");
    setSchedules(schedules.data);
  };

  const getRegisters = async () => {
    const registers = await axios.get("/api/v1/registers");
    setRegisters(registers.data);
  };

  const getScheduleTypes = async () => {
    const scheduleTypes = await axios.get("/api/v1/scheduleTypes");
    setScheduleTypes(scheduleTypes.data);
  };

  useEffect(() => {
    setErrMsg("");
  }, [date, comment]);

  const axios = useAxios();

  const handleAddSchedule = async () => {
    try {
      const schedule = await axios.post(`/api/v1/schedules/schedule`, {
        date,
        weeks,
        comment,
        register_id: register.register_id,
        schedule_type_id: scheduleType.schedule_type_id,
      });
      console.log("Dodano harmonogram o id: " + schedule.data.schedule_id);
      setDate("");
      setComment("");
      setRegister(null);
      setScheduleType(null);
      setErrMsg("");
    } catch (error) {
      setErrMsg("Nie udało się dodać harmonogramu.");
      console.log("Nie udało się dodać harmonogramu.");
    }
  };

  const handleEditSchedule = async () => {
    try {
      await axios.put(`/api/v1/schedules/schedule`, {
        schedule_id: schedule.schedule_id,
        date,
        comment,
        register_id: register.register_id,
        schedule_type_id: scheduleType.schedule_type_id,
      });
      console.log("Edytowano harmonogram o id: " + schedule.schedule_id);
      getSchedules();
      setDate("");
      setComment("");
      setRegister(null);
      setScheduleType(null);
      setErrMsg("");
    } catch (error) {
      setErrMsg("Nie udało się edytować harmonogramu." + error);
    }
  };

  const handleDeleteSchedule = async () => {
    try {
      await axios.delete(`/api/v1/schedules/schedule/${schedule.schedule_id}`);
      console.log("Usunięto harmonogram o id: " + schedule.schedule_id);
      getSchedules();
      setDate("");
      setComment("");
      setRegister(null);
      setScheduleType(null);
      setErrMsg("");
    } catch (error) {
      setErrMsg("Nie udało się usunąć harmonogramu." + error);
    }
  };

  const handleChangeRegister = (event) => {
    if (event.target.value !== "-") {
      setRegister(JSON.parse(event.target.value));
    } else {
      setRegister(null);
    }
  };

  const handleChangeScheduleType = (event) => {
    if (event.target.value !== "-") {
      setScheduleType(JSON.parse(event.target.value));
    } else {
      setScheduleType(null);
    }
  };

  const handleChangeSchedule = (event) => {
    const schedule = JSON.parse(event.target.value);
    if (event.target.value !== "-") {
      setSchedule(schedule);
      registers.forEach((reg) => {
        if (reg.register_id === schedule.register_id) {
          setRegister(reg);
        }
      });
      scheduleTypes.forEach((type) => {
        if (type.schedule_type_id === schedule.schedule_type_id) {
          setScheduleType(type);
        }
      });
      setDate(schedule.date);
      setComment(schedule.comment);
    } else {
      setSchedule(null);
      setRegister(null);
      setScheduleType(null);
      setDate("");
      setComment("");
    }
  };

  const clearData = () => {
    setSchedule(null);
    setRegister(null);
    setScheduleType(null);
    setDate("");
    setComment("");
    setErrMsg("");
  };

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
                onClick={clearData}
              >
                <Tab
                  eventKey="add-class"
                  title="Dodaj harmonogram"
                  onEnter={() => {
                    getRegisters();
                    getScheduleTypes();
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
                                type="datetime-local"
                                placeholder="Data rozpoczęcia"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                              />
                              <FormLabel>Data rozpoczęcia*:</FormLabel>
                            </FormGroup>
                          </Col>
                          <Col>
                            <FormGroup className="form-floating">
                              <FormControl
                                type="number"
                                placeholder="Ilość tygodni"
                                value={weeks}
                                onChange={(e) => setWeeks(e.target.value)}
                                required
                              />
                              <FormLabel>Ilość tygodni*:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="my-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormControl
                                type="text"
                                placeholder="Comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                              />
                              <FormLabel>Komentarz*:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="mt-4 mb-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormSelect
                                onChange={(e) => handleChangeRegister(e)}
                                value={JSON.stringify(register)}
                                required
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
                              <FormLabel>Dziennik*:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormSelect
                                onChange={(e) => handleChangeScheduleType(e)}
                                value={JSON.stringify(scheduleType)}
                                required
                              >
                                <option>-</option>
                                {scheduleTypes.map((schT) => (
                                  <option
                                    key={schT.schedule_type_id}
                                    value={JSON.stringify(schT)}
                                  >
                                    {schT.name}
                                  </option>
                                ))}
                              </FormSelect>
                              <FormLabel>Typ zajęć*:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row md={3} className="d-flex justify-content-center">
                          <Button onClick={handleAddSchedule}>Dodaj</Button>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </Tab>
                <Tab
                  eventKey="delete-class"
                  title="Usuń harmonogram"
                  onEnter={getSchedules}
                >
                  <Row className="justify-content-center">
                    <Col className="col-8 justify-content-center text-center">
                      <Form className="justify-content-center">
                        {errMsg && <Alert variant="danger">{errMsg}</Alert>}
                        <Row className="my-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormSelect
                                onChange={(e) => handleChangeSchedule(e)}
                                value={JSON.stringify(schedule)}
                              >
                                <option>-</option>
                                {schedules.map((sch) => (
                                  <option
                                    key={sch.schedule_id}
                                    value={JSON.stringify(sch)}
                                  >
                                    {sch.date} {sch.comment} {sch.register}
                                  </option>
                                ))}
                              </FormSelect>
                              <FormLabel>Harmonogram:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row md={3} className="d-flex justify-content-center">
                          <Button
                            onClick={handleDeleteSchedule}
                            disabled={!schedule}
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
                  title="Edytuj harmonogram"
                  onEnter={() => {
                    getSchedules();
                    getRegisters();
                    getScheduleTypes();
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
                              <FormSelect
                                onChange={(e) => handleChangeSchedule(e)}
                                value={JSON.stringify(schedule)}
                              >
                                <option>-</option>
                                {schedules.map((sch) => (
                                  <option
                                    key={sch.schedule_id}
                                    value={JSON.stringify(sch)}
                                  >
                                    {sch.date} {sch.comment} {sch.register}
                                  </option>
                                ))}
                              </FormSelect>
                              <FormLabel>Harmonogram:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="my-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormControl
                                type="datetime-local"
                                placeholder="Data rozpoczęcia"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                disabled={!schedule}
                              />
                              <FormLabel>Data:</FormLabel>
                            </FormGroup>
                          </Col>
                          <Col>
                            <FormGroup className="form-floating">
                              <FormControl
                                type="text"
                                placeholder="Comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                disabled={!schedule}
                              />
                              <FormLabel>Komentarz:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="mt-4 mb-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormSelect
                                onChange={(e) => handleChangeRegister(e)}
                                value={JSON.stringify(register)}
                                disabled={!schedule}
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
                        <Row className="mb-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormSelect
                                onChange={(e) => handleChangeScheduleType(e)}
                                value={JSON.stringify(scheduleType)}
                                disabled={!schedule}
                              >
                                <option>-</option>
                                {scheduleTypes.map((schT) => (
                                  <option
                                    key={schT.schedule_type_id}
                                    value={JSON.stringify(schT)}
                                  >
                                    {schT.name}
                                  </option>
                                ))}
                              </FormSelect>
                              <FormLabel>Typ zajęć:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row md={3} className="d-flex justify-content-center">
                          <Button
                            onClick={handleEditSchedule}
                            disabled={!schedule}
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

export default ScheduleActions;
