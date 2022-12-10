import React from "react";
import { FormGroup, FormLabel, FormSelect } from "react-bootstrap";

const SelectClass = ({ classes, setSelectedClass, value, disabled }) => {
  const handleChangeClass = (event) => {
    if (event.target.value !== "-") {
      setSelectedClass(JSON.parse(event.target.value));
    } else {
      setSelectedClass(null);
    }
  };

  return (
    <FormGroup className="form-floating">
      <FormSelect
        onChange={(e) => handleChangeClass(e)}
        value={JSON.stringify(value)}
      >
        <option>-</option>
        {classes.map((cls) => (
          <option key={cls.class_id} value={JSON.stringify(cls)}>
            {cls.name} {cls.school_year}
          </option>
        ))}
      </FormSelect>
      <FormLabel>Klasa:</FormLabel>
    </FormGroup>
  );
};

export default SelectClass;
