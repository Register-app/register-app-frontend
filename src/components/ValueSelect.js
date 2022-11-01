import React from 'react'

 
class ValueSelect extends React.Component{
 
    render(){
 
        return(
            <div>
                <select class="form-select" aria-label=".form-select-lg example" id={this.props.id} value={this.props.selected} onChange={(e) => this.props.onChange(e)}>
                    {this.props.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
            </div>
        )
    }
     
}
 
export default ValueSelect;