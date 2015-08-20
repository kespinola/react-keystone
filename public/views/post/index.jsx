import React from 'react';
import PostStore from '../../stores/post';
import connectToStores from 'alt/utils/connectToStores';
import {RouteHandler, State} from 'react-router';

const PostIndex = React.createClass({
  
  mixins:[State],
  
  render(){
    const{
      PostState,
      } = this.props;

    return <RouteHandler slug={slug}/>
  },
  
});

export default PostIndex;

