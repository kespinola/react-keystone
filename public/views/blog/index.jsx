import React from 'react';
import PostStore from '../../stores/post';
import connectToStores from 'alt/utils/connectToStores';
import {RouteHandler} from 'react-router';

const Blog = React.createClass({
  statics: {
    getStores(props) {
      return [PostStore]
    },
    getPropsFromStores(props) {
      PostStore.find();
      return {
        PostState: PostStore.getState(),
      }
    }
  },
  render(){
    const {
      PostState,
      } = this.props;
    return <RouteHandler State={PostState}/>
  }
});

export default connectToStores(Blog);

