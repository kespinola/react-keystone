import React from 'react';
import {State} from 'react-router';
import Container from 'react-container';
import _ from 'lodash';
import {ButtonInput, Input} from 'react-bootstrap';
import EditableDiv from 'react-wysiwyg-editor';
import PostStore from '../../stores/post';
import PostActions from '../../actions/post';

const EditPost = React.createClass({
  
  _getData(){
    return this.props.data.toJS()._id;
  },
  render(){

    const {
      data,
      } = this.props;

    if(!data) return null;
    
    const {
      title,
      text,
      } = data.toJS();

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
  
  _handleChange(key,e){
    const{
      _id
      } = this.props;
    PostActions.update({_id, update:{key, value:e.target.value}});
  },
  
  _handleSubmit(e){
    e.preventDefault();
    console.log(this.props);
    PostStore.patch(this.props._id);
  },
});

export default EditPost;

