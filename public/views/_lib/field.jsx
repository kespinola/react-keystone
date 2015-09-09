import React from 'react';
import Form from 'react-formal';

const Field = React.createClass({
  
  render(){
    return (
      <div className='form-group'>
        <Form.Field {... this.props}/>
      </div>
    )
  }
});

export default Field;
