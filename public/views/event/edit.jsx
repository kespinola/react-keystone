import React from 'react';
import { Row, Col, Input } from 'react-bootstrap';
import { State } from 'react-router';
import { Navigation } from 'react-router';
import Form from './_lib/form';
import { Button } from 'react-bootstrap';

const EditPost = React.createClass({
  
  mixins:[Navigation],
  
  render(){
    const{
      def,
      doc,
      } = this.props;
    
    if(!doc) return null;
    
    return (
      <Row>
        <Col xs={12} md={6} mdOffset={3}>
          <Form {... this.props} def={def} doc={doc} onSubmit={this._handleSubmit} submitLabel={'Edit Event'}/>
          <hr/>
          {doc.has('_id') ? <a href={`/keystone/eventss/${doc.get('_id')}`}>Update in Keystone</a> : null}
        </Col>
      </Row>
    )
  },
  
  _handleSubmit(doc){
    const{
      def,
      patch,
      } = this.props;
    patch({def, doc});
    this.transitionTo('event.list');
  },
  
});

export default EditPost;

