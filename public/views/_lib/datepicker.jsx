import React from 'react';
import { DateTimePicker } from 'react-widgets';

const Datepicker = React.createClass({
  
  render(){
    const{
      value,
      } = this.props;
    return <DateTimePicker value={value ? new Date(value) : null} onChange={this._handleChange} />
  },
  
  _handleChange(time){
    this.props.onChange(new Date(time));
  },
  
});

export default Datepicker;
