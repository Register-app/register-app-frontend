import React from 'react'

 
class GradeValue extends React.Component{

    render(){
      var ocenaStyle = {fontWeight: "bold"};

      switch(this.props.type){
        case 'kartkowka':
          ocenaStyle = {backgroundColor: "red", fontWeight: "bold"};
          break;
        case 'sprawdzian':
          ocenaStyle = {backgroundColor: "green", fontWeight: "bold"};
          break;
        case 'aktywnosc':
          ocenaStyle = {backgroundColor: "orange", fontWeight: "bold"};
          break;
        case 'propozycja':
          ocenaStyle = {backgroundColor: "rgb(102, 157, 245)", fontWeight: "bold"};
          break;
        case 'koncowa':
          ocenaStyle = {backgroundColor: "rgb(106, 110, 143)", fontWeight: "bold"};
          break;
        default:
          ocenaStyle = {fontWeight: "bold"};
      }
        return(
          
          <td>
          <div class="row">
            <div class="col-sm">
              <select class="form-select h-100 w-80" aria-label="" id={this.props.id} value={this.props.selected} onChange={(e) => this.props.onChange(e)} style={ocenaStyle}>
              {this.props.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
              </select>
            </div>
          </div>
        </td>
        )
    }
     
}
 
export default GradeValue;