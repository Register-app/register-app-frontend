import React from "react";
import { FormGroup, FormLabel, FormControl } from "react-bootstrap";

const DatePicker = ({ date, setSelectedDate, isDisabled }) => {
  const handleChangeDate = (event) => {
    if (event.target.value !== "-") {
      setSelectedDate(event.target.value);
    } else {
      setSelectedDate(null);
    }
  };
    return (
      
        <FormGroup className="form-floating">
          <FormControl
           onChange={(e) => handleChangeDate(e)}
            type="date"
            name="doj"
            defaultValue={date}
            placeholder="Data"
            disabled={isDisabled}
           
          />
          <FormLabel>Data:</FormLabel>
        </FormGroup>
      
    );
    };

export default DatePicker;
