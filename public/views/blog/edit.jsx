import React from 'react';
import {State} from 'react-router';
import Container from 'react-container';
import _ from 'lodash';
import {ButtonInput, Input} from 'react-bootstrap';
import EditableDiv from 'react-wysiwyg-editor';
import PostStore from '../../stores/post';

const EditPost = React.createClass({

  mixins:[State],
  
  render(){

    const {
      State,
      } = this.props;
    
    const item =  State.get("data").get(this.getParams()._id);
    
    if(!item) return <h1>Loading</h1>;
    
    const {
      title,
      text,
      } = item.toJS();
    return (
      <Container direction='column' component='article'>
        <form onSubmit={this._handleSubmit}>
          <Input type='text' label='Title' value={title} onChange={this._handleChange.bind(null,'title')}/>
          <div className='form-group'>
            <label className='control-label'>Text</label>
            <EditableDiv className='html-editor' content={text} onChange={this._handleChange.bind(null,'text')}/>
          </div>
          <ButtonInput type='submit' value='Save Post'/>
        </form>
      </Container>
    )
  },
  
  _handleChange(key,value){
    alert(value);
  },
  
  _handleSubmit(e){
    e.preventDefault();
  },
});

export default EditPost;

