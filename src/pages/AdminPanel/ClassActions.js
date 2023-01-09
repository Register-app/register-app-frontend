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

const ClassActions = () => {
  const [name, setName] = useState("");
  const [schoolYear, setSchoolYear] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  const getClasses = async () => {
    const classes = await axios.get("/api/v1/classes");
    setClasses(classes.data);
  };

  useEffect(() => {
    setErrMsg("");
  }, [name, schoolYear]);

  const axios = useAxios();

  const handleAddClass = async () => {
    try {
      const selectedClass = await axios.post(`/api/v1/classes/class`, {
        name,
      });
      console.log(
        "Dodano przedmiot: " +
          selectedClass.data.name +
          " o id: " +
          selectedClass.data.class_id
      );
      setName("");
      setSchoolYear("");
      setErrMsg("");
    } catch (error) {
      setErrMsg("Nie udało się dodać klasy.");
      console.log("Nie udało się dodać klasy.");
    }
  };

  const handleEditClass = async () => {
    try {
      await axios.put(`/api/v1/classes/class`, {
        class_id: selectedClass.class_id,
        name,
        school_year: schoolYear,
      });
      getClasses();
      setSelectedClass(null);
      setName("");
      setSchoolYear("");
      setErrMsg("");
    } catch (error) {
      setErrMsg("Nie udało się edytować klasy." + error);
    }
  };

  const handleDeleteClass = async () => {
    try {
      await axios.delete(`/api/v1/classes/class/${selectedClass.class_id}`);
      console.log(
        "Usunięto klasę: " +
          selectedClass.name +
          " o id: " +
          selectedClass.class_id
      );
      getClasses();
      setSelectedClass(null);
      setName("");
      setSchoolYear("");
      setErrMsg("");
    } catch (error) {
      setErrMsg("Nie udało się usunąć klasy." + error);
    }
  };

  const handleChangeClass = (event) => {
    const selectedClass = JSON.parse(event.target.value);
    if (event.target.value !== "-") {
      setSelectedClass(selectedClass);
      setName(selectedClass.name);
      setSchoolYear(selectedClass.school_year);
    } else {
      setSelectedClass(null);
    }
  };

  const clearData = () => {
    setName("");
    setSchoolYear("");
    setSelectedClass(null);
    setErrMsg("");
  };

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
                onClick={clearData}
              >
                <Tab
                  eventKey="add-class"
                  title="Dodaj klasę"
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
                        <Row className="my-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormControl
                                type="text"
                                placeholder="School Year"
                                value={schoolYear}
                                onChange={(e) => setSchoolYear(e.target.value)}
                                required
                              />
                              <FormLabel>Rok szkolny*:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row md={3} className="d-flex justify-content-center">
                          <Button onClick={handleAddClass}>Dodaj</Button>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </Tab>
                <Tab
                  eventKey="delete-class"
                  title="Usuń klasę"
                  onEnter={getClasses}
                >
                  <Row className="justify-content-center">
                    <Col className="col-8 justify-content-center text-center">
                      <Form className="justify-content-center">
                        {errMsg && <Alert variant="danger">{errMsg}</Alert>}
                        <Row className="my-2">
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
                                    {cls.name} {cls.schoolYear}
                                  </option>
                                ))}
                              </FormSelect>
                              <FormLabel>Klasa:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row md={3} className="d-flex justify-content-center">
                          <Button
                            onClick={handleDeleteClass}
                            disabled={!selectedClass}
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
                  title="Edytuj klasę"
                  onEnter={getClasses}
                >
                  <Row className="justify-content-center">
                    <Col className="col-8 justify-content-center text-center">
                      <Form className="justify-content-center">
                        {errMsg && <Alert variant="danger">{errMsg}</Alert>}
                        <Row className="my-2">
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
                                    {cls.name} {cls.schoolYear}
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
                              <FormControl
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!selectedClass}
                                required
                              />
                              <FormLabel>Nazwa:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="my-2">
                          <Col>
                            <FormGroup className="form-floating">
                              <FormControl
                                type="text"
                                placeholder="School Year"
                                value={schoolYear}
                                onChange={(e) => setSchoolYear(e.target.value)}
                                disabled={!selectedClass}
                                required
                              />
                              <FormLabel>Rok szkolny:</FormLabel>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row md={3} className="d-flex justify-content-center">
                          <Button
                            onClick={handleEditClass}
                            disabled={!selectedClass}
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

export default ClassActions;
