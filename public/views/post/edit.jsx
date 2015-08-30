import React from 'react';
import { Row, Col, Input } from 'react-bootstrap';
import { State } from 'react-router';
import _ from 'lodash';
import WYSIWYG from '../_lib/wysiwyg';
import Datepicker from '../_lib/datepicker';
import Form from 'react-formal';
import { DropdownList } from 'react-widgets';
import _s from 'underscore.string';
import { Navigation } from 'react-router';

const EditPost = React.createClass({
  
  mixins:[Navigation],
  
  getInitialState(){
    return {
      doc:this.props.doc ? this.props.doc.toJS() : {},
    }
  },
  
  componentWillReceiveProps(props){
    props.data && this.setState({model:props.doc.toJS()});
  },
  
  render(){
    const {
      doc,
      } = this.state;
    const{
      meta,
      } = this.props;
    
    return (
      <Row>
        <Col xs={12} md={6} mdOffset={3}>
          <Form
            className='basic'
            schema={meta.get('schema')}
            value={doc}
            onChange={doc => this.setState({doc})}
            onSubmit={this._handleSubmit}
            >
            <Form.Summary />
            <Form.Field name='title'/>
            <Form.Field name='state' type={DropdownList} data={['draft','published','archived']} />
            <Form.Field name='publishedDate' type={Datepicker}/>
            <Form.Field name='text' type={WYSIWYG}/>
            <Form.Button type='submit' className='submit'>Edit Post</Form.Button>
          </Form>
        </Col>
      </Row>
    )
  },
  
  _handleSubmit(){
    const{
      doc,
      } = this.state;
    this.props.patch({resource:'posts', doc});
    this.transitionTo('post.list');
  },
  
});

export default EditPost;

