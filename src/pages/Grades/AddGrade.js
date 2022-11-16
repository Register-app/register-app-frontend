import ClassSelect from "components/form/ClassSelect";
import DatePicker from "components/form/datePicker";
import GradeValue from "components/form/gradeValue";
import ValueSelect from "components/form/valueSelect";
import { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

const AddGrade = () => {
  //Przykladowe dane

  var grades = [
    {
      student_id: "1",
      grade_id: "2",
      subject: "Przyroda",
      category: "kartkowka",
      grade: "5",
    },
    {
      student_id: "1",
      grade_id: "5",
      subject: "Przyroda",
      category: "sprawdzian",
      grade: "2",
    },
    {
      student_id: "64",
      grade_id: "3",
      subject: "Przyroda",
      category: "aktywnosc",
      grade: "2",
    },
  ];
  var students = [
    {
      student_id: "1",
      name: "Jan",
      second_name: "Kowal",
    },
    {
      student_id: "53",
      name: "Janina",
      second_name: "Bareja",
    },
    {
      student_id: "64",
      name: "Karolina",
      second_name: "Turban",
    },
  ];

  var classes = [
    { klasa_id: "1", klasa: "VII A" },
    { klasa_id: "2", klasa: "VI B" },
    { klasa_id: "3", klasa: "IV C" },
  ];

  // console.log(students);

  // students.forEach(obj =>{
  //   console.log(obj.second_name)
  // })

  const ocenyOptions = [
    { value: "1", text: "1" },
    { value: "2-", text: "2-" },
    { value: "2", text: "2" },
    { value: "2+", text: "2+" },
    { value: "3-", text: "3-" },
    { value: "3", text: "3" },
    { value: "3+", text: "3+" },
    { value: "4-", text: "4-" },
    { value: "4", text: "4" },
    { value: "4+", text: "4+" },
    { value: "5-", text: "5-" },
    { value: "5", text: "5" },
    { value: "5+", text: "5+" },
    { value: "6-", text: "6-" },
    { value: "6", text: "6" },
  ];

  const kategoriaOptions = [
    { value: "wybierz", text: "wybierz" },
    { value: "sprawdzian", text: "Sprawdzian" },
    { value: "kartkowka", text: "Kartkówka" },
    { value: "aktywnosc", text: "Aktywność" },
    { value: "inne", text: "Inne" },
  ];

  const [selected, setSelected] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  // console.log("Data: "+ new Date().toLocaleDateString('en-CA'));

  const handleChange = (event) => {
    console.log(event.target.value);
    alert(event.target.value);
    setSelected(event.target.value);
  };

  const handleChangeKategoria = (event) => {
    console.log(event.target.value);
    switch (event.target.value) {
      case "kartkowka":
        document.getElementById(event.target.id).style.backgroundColor =
          "green";
        break;
      case "aktywnosc":
        document.getElementById(event.target.id).style.backgroundColor =
          "orange";
        break;
      case "sprawdzian":
        document.getElementById(event.target.id).style.backgroundColor = "red";
        break;
      case "inne":
        document.getElementById(event.target.id).style.backgroundColor =
          "rgb(131, 177, 236)";
        break;
      default:
        document.getElementById(event.target.id).style.backgroundColor =
          "white";
    }
    //alert(event.target.value);
    setSelected(event.target.value);
  };

  const handleChangeOcena = (event) => {
    console.log(event.target.value);
    switch (document.getElementById("kategoria").value) {
      case "kartkowka":
        document.getElementById(event.target.id).style.backgroundColor =
          "green";
        break;
      case "aktywnosc":
        document.getElementById(event.target.id).style.backgroundColor =
          "orange";
        break;
      case "sprawdzian":
        document.getElementById(event.target.id).style.backgroundColor = "red";
        break;
      case "inne":
        document.getElementById(event.target.id).style.backgroundColor =
          "rgb(131, 177, 236)";
        break;
      default:
        document.getElementById(event.target.id).style.backgroundColor =
          "white";
    }
    //alert(event.target.value);
    setSelected(event.target.value);
  };

  const handleChangeDate = (event) => {
    console.log(event.target.value);
    alert(event.target.value);
    setSelectedDate(event.target.value);
  };

  function studentsGrades(students, grades) {
    return (
      <>
        <>
          {grades.array.forEach((grade) => {
            if (students.student_id === grade.student_id) {
              <GradeValue
                id={grade.grade_id}
                options={ocenyOptions}
                value={grade.grade}
                selected={grade.grade}
                onChange={handleChangeOcena}
                type={grade.category}
              />;
            }
          })}
        </>
      </>
    );
  }

  function studentsList(students) {
    var i = 0;
    return (
      <>
        {students.map((student) => {
          i++;
          return (
            <tr>
              <td>{i}</td>
              <td>{student.name + " " + student.second_name}</td>
              <td>{studentsGrades(student, grades)}</td>
              <td>
                <GradeValue
                  id="ocenaPropozycja"
                  options={ocenyOptions}
                  value={selected}
                  onChange={handleChangeOcena}
                  type="propozycja"
                />
              </td>
              <td>
                <GradeValue
                  id="ocenaKoncowa"
                  options={ocenyOptions}
                  value={selected}
                  onChange={handleChangeOcena}
                  type="koncowa"
                />
              </td>
              <td>
                <ValueSelect
                  id={i}
                  options={ocenyOptions}
                  value={selected}
                  onChange={handleChangeOcena}
                />
              </td>
            </tr>
          );
        })}
      </>
    );
  }

  return (
    <Container className="Frequency justify-content-md-center">
      <Row className="justify-content-md-center text-center">
        <div class="row gy-3">
          <h3 id="test">Dodaj ocenę</h3>

          <Container className="row gy-4 justify-content-md-center">
            <Row>
              <Col>
                Wybierz klasę:
                <ClassSelect
                  id="klasa"
                  options={classes}
                  value={selected}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                Wybierz datę:
                <DatePicker
                  selectedValue={selectedDate}
                  onChange={handleChangeDate}
                />
              </Col>
              <Col>
                Wybierz kategorię:
                <ValueSelect
                  id="kategoria"
                  options={kategoriaOptions}
                  value={selected}
                  onChange={handleChangeKategoria}
                />
              </Col>
            </Row>
            <Row>
              <Container className="row gy-2 justify-content-md-center">
                <Table striped bordered hover responsive="sm">
                  <thead>
                    <tr>
                      <th>Numer</th>
                      <th>Imie i nazwisko</th>
                      <th>Oceny cząstkowe</th>
                      <th>Ocena proponowana</th>
                      <th>Ocena końcowa</th>
                      <th>Nowa Ocena</th>
                    </tr>
                  </thead>
                  <tbody>{studentsList(students)}</tbody>
                </Table>
                <Row>
                  <Col>
                    <Button
                      variant="outline-success"
                      value="zapisz"
                      onClick={handleChange}
                    >
                      Zapisz
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="outline-danger"
                      value="wyczysc"
                      onClick={handleChange}
                    >
                      Wyczyść
                    </Button>
                  </Col>
                </Row>
                <div class="mt-3"></div>
              </Container>
            </Row>
          </Container>
        </div>
      </Row>
    </Container>
  );
};

export default AddGrade;
