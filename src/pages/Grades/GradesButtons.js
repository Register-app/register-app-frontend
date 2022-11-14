import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "pages/Grades/GradesButtons.css";

const gradeValues = [
  { value: 5.75, text: "6-" },
  { value: 6, text: "6" },
  { value: 0, text: "+" },
  { value: 4.75, text: "5-" },
  { value: 5, text: "5" },
  { value: 5.5, text: "5+" },
  { value: 3.75, text: "4-" },
  { value: 4, text: "4" },
  { value: 4.5, text: "4+" },
  { value: 2.75, text: "3-" },
  { value: 3, text: "3" },
  { value: 3.5, text: "3+" },
  { value: 1.75, text: "2-" },
  { value: 2, text: "2" },
  { value: 2.5, text: "2+" },
  { value: 0, text: "-" },
  { value: 1, text: "1" },
  { value: 1.5, text: "1+" },
];

const GradesButtons = () => {
  const [addGrade, setAddGrade] = useState(0);

  const handleAddGrade = (grade) => {
    setAddGrade(grade);
    console.log(grade.value);
  };
  return (
    <Container className="GradesButtons">
      <Row>
        {gradeValues.map((grade) => (
          <Col md={4}>
            <div className="btn border" onClick={() => handleAddGrade(grade)}>
              {grade.text}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GradesButtons;
