import React from 'react';
import { Row, Col, Input } from 'react-bootstrap';
import { State } from 'react-router';
import _ from 'lodash';
import WYSIWYG from '../_lib/wysiwyg';
import Datepicker from '../_lib/datepicker';
import Form from 'react-formal';
import { DropdownList } from 'react-widgets';

const EditPost = React.createClass({
  
  getInitialState(){
    return {
      model:this.props.data ? this.props.data.toJS() : {},
    }
  },
  
  componentWillReceiveProps(props){
    props.data && this.setState({model:props.data.toJS()});
  },
  
  render(){
    const {
      model,
      } = this.state;
    const{
      schema,
      } = this.props;
    return (
      <Row>
        <Col xs={12} md={6} mdOffset={3}>
          <Form
            className='basic'
            schema={schema}
            value={model}
            onChange={model => this.setState({model})}
            onSubmit={this._handleSubmit}
            >
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
    debugger;
    this.props.patch({resource:'posts', doc:this.state.model})
  },
});

export default EditPost;

