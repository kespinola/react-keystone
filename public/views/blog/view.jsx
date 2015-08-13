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
    const {
      title,
      text,
      image,
      } = State.get("data").get(_id).toJS();
    return (
      <Container direction='column' component='article'>
        <h1>{title}</h1>
        {image ? <img src={`/files/${image.filename}`}/> : null}
        <div dangerouslySetInnerHTML={{__html: text}}/>
        <ButtonLink to="blog.edit" params={{_id}}>Edit Post</ButtonLink>
      </Container>
    )
  }
});

export default Post;

