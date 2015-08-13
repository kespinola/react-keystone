import React from 'react';
import {State} from 'react-router';
import Container from 'react-container';
import _ from 'lodash';
import {ButtonLink} from 'react-router-bootstrap';

const Post = React.createClass({

  mixins:[State],
  
  render(){
    const _id = this.getParams()._id;
    const {
      State,
      } = this.props;
    const item =  State.get("data").get(this.getParams()._id);
    
    if(!item) return <h1>Loading Post...</h1>;
    
    const {
      title,
      text,
      } = item.toJS();
    return (
      <Container direction='column' component='article'>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{__html: text}}/>
        <ButtonLink to="blog.edit" params={{_id}}>Edit Post</ButtonLink>
      </Container>
    )
  }
});

export default Post;

