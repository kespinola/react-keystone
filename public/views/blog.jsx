import React from 'react';
import Container from 'react-container';

const Blog = React.createClass({
  contextTypes:{
    flux:React.PropTypes.object,
  },
	render(){
    console.log(this.context.flux.stores.Post.getState());
		return (
      <Container direction='column'>
        <h1>Blog</h1>
      </Container>
		)
	}
});

export default Blog;
