import React from 'react'

 
class ClassSelect extends React.Component{
 
    render(){
 
        return(
            <div>
                <select class="form-select" aria-label=".form-select-lg example" id={this.props.id} value={this.props.selected} onChange={(e) => this.props.onChange(e)}>
                    {this.props.options.map((option) => (
                      <option key={option.klasa_id} value={option.klasa_id}>
                        {option.klasa}
                      </option>
                    ))}
                  </select>
            </div>
        )
    }
     
}
 
export default ClassSelect;