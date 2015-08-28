import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'react-bootstrap';
import {ButtonLink} from 'react-router-bootstrap';

const Post = React.createClass({
  
  render(){
    
    const {
      doc,
      } = this.props;
    
    if(!doc) return null;
    
    const {
      slug,
      title,
      text,
      } = doc.toJS();
    
    return (
      <Row>
        <Col xs={12}>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{__html: text}}/>
          <ButtonLink to="post.edit" params={{slug}}>Edit Post</ButtonLink>
        </Col>
      </Row>
    )
  }
});

export default Post;

