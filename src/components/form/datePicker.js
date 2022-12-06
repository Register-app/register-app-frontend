import React from "react";
import { Form } from "react-bootstrap";

class DatePicker extends React.Component {
  render() {
    return (
      <div>
        <Form.Group controlId="doj">
          {/* <Form.Label>Wybierz datę</Form.Label> */}
          <Form.Control
            type="date"
            name="doj"
            defaultValue={this.props.selectedValue}
            placeholder="Data"
            onChange={(e) => this.props.onChange(e)}
          />
        </Form.Group>
      </div>
    );
  }
}

export default DatePicker;
