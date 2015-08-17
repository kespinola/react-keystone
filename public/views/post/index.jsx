import React from 'react';
import PostStore from '../../stores/post';
import connectToStores from 'alt/utils/connectToStores';
import {RouteHandler, State} from 'react-router';

const PostIndex = React.createClass({
  
  mixins:[State],
  
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
      PostState,
      } = this.props;
    const _id = this.getParams()._id;
    const collection = PostState.get('data');
    return <RouteHandler _id={_id} data={_id ? collection.get(_id) : collection.toArray()}/>
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

