import React from 'react';
import { DateTimePicker } from 'react-widgets';

const Datepicker = React.createClass({
  
  render(){
    const{
      value,
      time,
      } = this.props;
    return <DateTimePicker value={new Date(value)} onChange={this._handleChange} time={time} />
  },
  
  _handleChange(time){
    this.props.onChange(new Date(time))
  },
  
});

export default Datepicker;
