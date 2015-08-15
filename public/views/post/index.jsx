import React from 'react';
import PostStore from '../../stores/post';
import connectToStores from 'alt/utils/connectToStores';
import {RouteHandler} from 'react-router';

const PostIndex = React.createClass({

  statics: {
    getStores(props) {
      return [PostStore]
    },
    getPropsFromStores(props) {
      return {
        PostState: PostStore.getState(),
      }
    }
  },
  
  render(){
    const {
      PostState,
      } = this.props;
    const _id = this.getParams()._id;
    const data = PostState.get("data");
    
    if(!data.has(_id)) return null;
    
    return <RouteHandler data={data.get(_id)}/>
  },

  componentDidMount(){
    PostStore.fetch({_id:this.getParams()._id});
  },
  
});

export default connectToStores(PostIndex);

