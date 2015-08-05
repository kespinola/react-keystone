import React from 'react';
import Container from 'react-container';
import connectToStores from 'alt/utils/connectToStores';
import PostStore from '../stores/post';

const Blog = React.createClass({
  statics: {
    getStores(props) {
      return [PostStore]
    },
    getPropsFromStores(props) {
      return {
        posts:PostStore.find()
      }
    }
  },
  render(){
    const{
      posts,
      } = this.props;
    return (
      <Container direction='column'>
        <h1>Blog</h1>
        <h2>There are {posts.length}</h2>
      </Container>
    )
  }
});

export default connectToStores(Blog);
