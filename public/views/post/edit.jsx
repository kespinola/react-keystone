import React from 'react';
import { Row, Col, Input } from 'react-bootstrap';
import { State } from 'react-router';
import { Navigation } from 'react-router';
import Form from './_lib/form';

const EditPost = React.createClass({
  
  mixins:[Navigation],
  
  render(){
    const{
      def,
      doc,
      } = this.props;
    return (
      <Row>
        <Col xs={12} md={6} mdOffset={3}>
          <Form def={def} doc={doc} onSubmit={this._handleSubmit}/>
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
    this.transitionTo('post.list');
  },
  
});

export default EditPost;

