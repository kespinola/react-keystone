import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'react-bootstrap';
import {ButtonLink} from 'react-router-bootstrap';

const Event = React.createClass({
  
  render(){
    
    const {
      doc,
      } = this.props;
    
    if(!doc) return null;
    
    const {
      _id,
      title,
      description,
      } = doc.toJS();
    
    return (
      <Row>
        <Col xs={12}>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{__html: description}}/>
          <ButtonLink to="event.edit" params={{_id}}>Edit Event</ButtonLink>
        </Col>
      </Row>
    )
  }
});

export default Event;

