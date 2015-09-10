import React from 'react';
import { Row, Col, Input } from 'react-bootstrap';
import { State } from 'react-router';
import { Navigation } from 'react-router';
import Form from './_lib/form';

const Create = React.createClass({

  mixins:[Navigation],

  render(){
    const{
      def,
      } = this.props;
    return (
      <Row>
        <Col xs={12} md={6} mdOffset={3}>
          <Form {... this.props} def={def} onSubmit={this._handleSubmit} submitLabel={'Create Event'}/>
        </Col>
      </Row>
    )
  },

  _handleSubmit(doc){
    const{
      def,
      create,
      } = this.props;
    create({def, doc});
    this.transitionTo('event.list');
  },

});

export default Create;

