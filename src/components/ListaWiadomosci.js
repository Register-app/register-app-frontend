import "./style/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container, Row, Table} from 'react-bootstrap';
import {TrashFill } from "react-bootstrap-icons";



function ListaWiadomosci() {
  

  return (
    <Container className="justify-content-md-center min-vh-100">
      
      <Row className="text-center">
        <div class="row gy-3"> 
        <h3>Lista wiadomości</h3><br/>
        </div>
        
        </Row>
        
        <Row>
        <Table striped bordered hover responsive="sm" >
      <thead>
        <tr>
          <th>LP</th>
          <th>Nadawca</th>
          <th>Treść</th>
          <th>Data</th>
          <th>Akcja</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Nauczyciel1</td>
          <td>Lorem impsum1</td>
          <td>20-03-2022</td>
          <td><button type="button"><TrashFill /></button></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Nauczyciel2</td>
          <td>Lorem impsum2</td>
          <td>05-05-2022</td>
          <td><button type="button"><TrashFill /></button></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Nauczyciel3</td>
          <td>Lorem impsum3</td>
          <td>10-10-2022</td>
          <td><button type="button"><TrashFill /></button></td>
        </tr>
      </tbody>
    </Table>
        </Row>
        
  </Container>
  );
}

export default ListaWiadomosci;
