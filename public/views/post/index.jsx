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
    const slug = this.getParams().slug;
    const collection = PostState.get('data');
    return <RouteHandler slug={slug} data={slug ? collection.get(slug) : collection.toArray()}/>
  },
  
  componentDidUpdate(){
    this._fetchData();
  },
  
  componentDidMount(){
    this._fetchData();
  },
  
  _fetchData(){
    const {
      slug,
      } = this.props;
    PostStore.fetch(slug ? {slug} : {})
  },
});

export default connectToStores(PostIndex);

