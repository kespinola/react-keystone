import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { State } from 'react-router';
import _ from 'lodash';
import Form from 'react-formal';

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
        <Col xs={12} md={6}>
          <Form
            schema={schema}
            value={model}
            onChange={model => this.setState({model})}>
            <Form.Field name='title'/>
            <Form.Field name='state' type='select'>
              <option value={'draft'}>Draft</option>
              <option value={'published'}>Published</option>
              <option value={'archived'}>Archived</option>
            </Form.Field>
            <Form.Button type='submit'>Edit Post</Form.Button>
          </Form>
        </Col>
      </Row>
    )
  },
  
  _handleChange(key,e){
    const{
      slug,
      update,
      } = this.props;
    update({resource:'posts', key:slug, update:{[key]:e.target.value}})
  },
  
  _handleSubmit(e){
    const{
      patch,
      data,
      } = this.props;
    e.preventDefault();
    patch({resource:'posts', doc:data.toJS()})
  },
});

export default EditPost;

