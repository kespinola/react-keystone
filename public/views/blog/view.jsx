import React from 'react';
import {State} from 'react-router';
import Container from 'react-container';
import _ from 'lodash';

const Post = React.createClass({

  mixins:[State],
  
  render(){
    
    const {
      State,
      } = this.props;
    const {
      title,
      text,
      image,
      } = State.get("data").get(this.getParams()._id).toJS();
    return (
      <Container direction='column' component='article'>
        <h1>{title}</h1>
        {image ? <img src={`/files/${image.filename}`}/> : null}
        <div dangerouslySetInnerHTML={{__html: text}}/>
      </Container>
    )
  }
});

export default Post;

