import React from 'react';
import {State} from 'react-router';
import Container from 'react-container';
import _ from 'lodash';
import {ButtonInput, Input} from 'react-bootstrap';
import PostStore from '../../stores/post';
import {Navigation} from 'react-router';

const CreatePost = React.createClass({
  mixins:[Navigation],
  getInitialState(){
    return {
      title:'',
    }
  },
  render(){
    const{
      title,
      } = this.state;
    return (
      <Container direction='column' component='article'>
        <form onSubmit={this._handleSubmit}>
          <Input type='text' label='Title' value={title} onChange={this._handleChange}/>
          <ButtonInput type='submit' value='Create Post'/>
        </form>
      </Container>
    )
  },

  _handleChange(e){
    this.setState({title:e.target.value});
  },

  _handleSubmit(e){
    e.preventDefault();
    const{
      title,
      } = this.state;
    if(_.isEmpty(title)){
      alert('Title is required!');
    }else{
      PostStore.create({title});
      this.transitionTo('post.list');
    }
  },
});

export default CreatePost;

