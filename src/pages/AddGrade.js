import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import DatePicker from "components/DatePicker";
import ValueSelect from "components/ValueSelect";
import GradeValue from "components/GradeValue";
import ClassSelect from "components/ClassSelect";

const AddGrade = () => {

  //Przykladowe dane

  var grades = [
                {
                  "student_id":"1",
                  "grade_id":"2",
                  "subject":"Przyroda",
                  "category":"kartkowka",
                  "grade":"5"
              },
              {
                "student_id":"2",
                "grade_id":"3",
                "subject":"Przyroda",
                "category":"kartkowka",
                "grade":"2"
            }
              ];

  var classes = [
    { "klasa_id": "1", "klasa": "VII A" },
    { "klasa_id": "2", "klasa": "VI B" },
    { "klasa_id": "3", "klasa": "IV C" },
  ];


// console.log(grades.length);

// classes.classes.forEach(obj => {
//     console.log(obj);
//     // klasa.set(obj.klasa_id,obj.klasa)
//     // klasa.push(obj.klasa);
//   });

  // klasa.forEach((values,keys)=>{
  //   console.log(values)
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
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA'));
  // console.log("Data: "+ new Date().toLocaleDateString('en-CA'));

  const handleChange = (event) => {
    console.log(event.target.value);
    alert(event.target.value);
    setSelected(event.target.value);
  };

  const handleChangeKategoria = (event) => {
    console.log(event.target.value);
    if(event.target.value==='sprawdzian'){
      document.getElementById(event.target.id).style.backgroundColor = "red";
    }
    if(event.target.value==='kartkowka'){
      document.getElementById(event.target.id).style.backgroundColor = "green";
    }
    //alert(event.target.value);
    setSelected(event.target.value);
  };

  const handleChangeOcena = (event) => {
    console.log(event.target.value);
    if(document.getElementById('kategoria').value==='sprawdzian'){
      document.getElementById(event.target.id).style.backgroundColor = "red";
    }
    if(document.getElementById('kategoria').value==='kartkowka'){
      document.getElementById(event.target.id).style.backgroundColor = "green";
    }
    //alert(event.target.value);
    setSelected(event.target.value);
  };

  const handleChangeDate = (event) => {
    console.log(event.target.value);
    alert(event.target.value);
    setSelectedDate(event.target.value);
  };

  
  return (
    <Container className="Frequency justify-content-md-center">
      <Row className="justify-content-md-center text-center">
        <div class="row gy-3">
          <h3 id='test'>Dodaj ocenę</h3>
          
          <Container className="row gy-4 justify-content-md-center">
            <Row>
              <Col>
              Wybierz klasę:
              <ClassSelect id="klasa" options={classes} value={selected} onChange={handleChange}/>
              </Col>
              <Col>
              Wybierz datę:
                <DatePicker selectedValue={selectedDate} onChange={handleChangeDate}/>
              </Col>
              <Col>
              Wybierz kategorię:
              <ValueSelect id="kategoria" options={kategoriaOptions} value={selected} onChange={handleChangeKategoria}/>
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
          <tbody>
            <tr>
              <td>1</td>
              <td>Jan Kowal</td>
              <td>
                <GradeValue id="ocena" options={ocenyOptions} value={selected} onChange={handleChangeOcena} type='sprawdzian'/>
                <GradeValue id="ocena" options={ocenyOptions} value={selected} onChange={handleChangeOcena} type='kartkowka'/>
                <GradeValue id="ocena" options={ocenyOptions} value={selected} onChange={handleChangeOcena} type='kartkowka'/>
                <GradeValue id="ocena" options={ocenyOptions} value={selected} onChange={handleChangeOcena} type='aktywnosc'/>
              </td>
              <td>
                  {/* <div class="col-2 propozycja">3-</div> */}
                  <GradeValue id="ocena" options={ocenyOptions} value={selected} onChange={handleChangeOcena} type='propozycja'/>
              </td>
              <td>
                <GradeValue id="ocena" options={ocenyOptions} value={selected} onChange={handleChangeOcena} type='koncowa'/>
              </td>
              <td>
                <ValueSelect id='1' options={ocenyOptions} value={selected} onChange={handleChangeOcena}/>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Pawel Przybysz</td>
              <td>
                <GradeValue id="ocena" options={ocenyOptions} value={selected} onChange={handleChangeOcena} type='sprawdzian'/>
                <GradeValue id="ocena" options={ocenyOptions} value={selected} onChange={handleChangeOcena} type='kartkowka'/>
                <GradeValue id="ocena" options={ocenyOptions} value={selected} onChange={handleChangeOcena} type='kartkowka'/>
                <GradeValue id="ocena" options={ocenyOptions} value={selected} onChange={handleChangeOcena} type='aktywnosc'/>
              </td>
              <td>
               <GradeValue id="ocena" options={ocenyOptions} value={selected} onChange={handleChangeOcena} type='propozycja'/>
                </td>
              <td>
                <GradeValue id="ocena" options={ocenyOptions} value={selected} onChange={handleChangeOcena} type='koncowa'/>
              </td>
              <td>
                <ValueSelect id='2' options={ocenyOptions} value={selected} onChange={handleChangeOcena}/>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Anna Bareja</td>
              <td>
                <GradeValue id="ocena" options={ocenyOptions} value={selected} onChange={handleChangeOcena} type='sprawdzian'/>
                <GradeValue id="ocena" options={ocenyOptions} value={selected} onChange={handleChangeOcena} type='kartkowka'/>
                <GradeValue id="ocena" options={ocenyOptions} value={selected} onChange={handleChangeOcena} type='kartkowka'/>
                <GradeValue id="ocena" options={ocenyOptions} value={selected} onChange={handleChangeOcena} type='aktywnosc'/>
              </td>
              <td>
                <GradeValue id="ocena" options={ocenyOptions} value={selected} onChange={handleChangeOcena} type='propozycja'/>
              </td>
              <td>
                <GradeValue id="ocena" options={ocenyOptions} value={selected} onChange={handleChangeOcena} type='koncowa'/>
              </td>
              <td><ValueSelect id='3' options={ocenyOptions} value={selected} onChange={handleChangeOcena}/></td>
            </tr>
          </tbody>
        </Table>
                <Row>
                  <Col><Button variant="outline-success" value='zapisz' onClick={handleChange}>Zapisz</Button></Col>
                  <Col><Button variant="outline-danger" value='wyczysc' onClick={handleChange}>Wyczyść</Button></Col>
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
