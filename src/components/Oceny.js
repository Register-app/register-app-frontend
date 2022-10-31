import {useState} from 'react';
import "./style/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container, Row, Table } from 'react-bootstrap';



function Oceny() {

    const options = [
      {value: 'default', text: 'Wybierz semestr'},
      {value: 'sem1', text: 'Semestr 1'},
      {value: 'sem2', text: 'Semestr 2'}
    ];
  
    const [selected, setSelected] = useState(options[0].value);
    
    const handleChange = event => {
      console.log(event.target.value);
      alert(event.target.value)
      setSelected(event.target.value);
  
    };

  return (
    <Container className="justify-content-md-center min-vh-100">
      
      <Row className="text-center">
        <div class="row gy-3"> 
        <h3>Oceny</h3><br/>

    </div>
        </Row>
        <div>
           <select class="form-select form-select-xs mb-3" aria-label=".form-select-lg example" value={selected} onChange={handleChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      </div>
        <Row>
          
        <Table striped bordered hover responsive="sm" >
      <thead>
        <tr>
          <th>Przedmiot</th>
          <th>Oceny cząstkowe</th>
          <th>Ocena proponowana</th>
          <th>Ocena końcowa</th>

        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Matematyka</td>
          <td>
            <div class="row px-2">
              <div class="col-2 sprawdzian">5</div><div class="col-2 aktywnosc">5</div><div class="col-2 kartkowka">3+</div><div class="col-2 aktywnosc">5</div>
            </div>
            </td>
          <td>
            <div class="row px-2">
                <div class="col-2 propozycja">3-</div>
            </div>
          </td>
          <td>
            <div class="row px-2">
              <div class="col-2 koncowa">3</div>
            </div>
          </td>

        </tr>
        <tr>
          <td>Przyroda</td>
          <td>
            <div class="row px-2">
              <div class="col-2 sprawdzian">3</div><div class="col-2 aktywnosc">2</div><div class="col-2 kartkowka">3+</div><div class="col-2 aktywnosc">5</div>
            </div>
            </td>
          <td>
            <div class="row px-2">
                <div class="col-2 propozycja">4+</div>
            </div>
          </td>
          <td>
            <div class="row px-2">
              <div class="col-2 koncowa">4</div>
            </div>
          </td>

        </tr>
        <tr>
          <td>Wychowanie Fizyczne</td>
          <td>
            <div class="row px-2">
              <div class="col-2 sprawdzian">4+</div><div class="col-2 aktywnosc">3=</div><div class="col-2 kartkowka">3+</div><div class="col-2 aktywnosc">5</div>
            </div>
            </td>
          <td>
            <div class="row px-2">
                <div class="col-2 propozycja">2</div>
            </div>
          </td>
          <td>
            <div class="row px-2">
              <div class="col-2 koncowa">2</div>
            </div>
          </td>

        </tr>
      </tbody>
    </Table>
        </Row>
      
  </Container>
  );
}

export default Oceny;
