import React from "react";
import { FormGroup, FormLabel, FormSelect } from "react-bootstrap";

const SelectSubject = ({ subjects, setSubject, isDisabled }) => {
  const handleChangeClass = (event) => {
    if (event.target.value !== "-") {
      setSubject(JSON.parse(event.target.value));
    } else {
      setSubject(null);
    }
  };

  return (
    <FormGroup className="form-floating">
      <FormSelect onChange={(e) => handleChangeClass(e)} disabled={isDisabled}>
        <option>-</option>
        {subjects.map((subject) => (
          <option key={subject.subject_id} value={JSON.stringify(subject)}>
            {subject.name}
          </option>
        ))}
      </FormSelect>
      <FormLabel>Przedmiot:</FormLabel>
    </FormGroup>
  );
};

export default SelectSubject;
