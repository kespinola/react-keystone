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
        PostState:PostStore.getState(),
      }
    }
  },
  
  render(){
    const{
      _id,
      PostState,
      } = this.props;
    const collection = PostState.get('data');
    return <RouteHandler data={_id ? collection.get(_id) : collection.toArray()}/>
  },
  
  componentDidUpdate(){
    this._fetchData();
  },
  
  componentDidMount(){
    this._fetchData();
  },
  
  _fetchData(){
    const {
      _id
      } = this.props;
    PostStore.fetch(_id ? {_id} : {})
  },
});

export default connectToStores(PostIndex);

