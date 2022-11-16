import React from "react";
import { FormSelect } from "react-bootstrap";

const ClassSelect = ({ classes, setSelectedClass }) => {
  const handleChangeClass = (event) => {
    setSelectedClass(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <FormSelect onChange={(e) => handleChangeClass(e)}>
        <option value="">Wybierz klasę</option>
        {classes.map((cls) => (
          <option value={cls.class_id}>{cls.name}</option>
        ))}
      </FormSelect>
    </>
  );
};

export default ClassSelect;
