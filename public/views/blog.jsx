import React from 'react';
import Container from 'react-container';
import connectToStores from 'alt/utils/connectToStores';
import Post from '../stores/post';

const Blog = React.createClass({
  statics: {
    getStores(props) {
      return [Post]
    },
    getPropsFromStores(props) {
      Post.find();
      return {
        PostState:Post.getState(),
      }
    }
  },
  render(){
    const{
      PostState,
      } = this.props;
    
    return (
      <Container direction='column'>
        <h1>Blog</h1>
        <section dangerouslySetInnerHTML={{__html: '<p>P tag</p>'}}>more stuff</section>
        <ul>
          {PostState.get('data').toArray().map((map)=>{
            const{
              _id,
              title,
              text,
              } = map.toObject();
            return (
              <li key={_id}>
                <article>
                  <h1>{title}</h1>
                  <p dangerouslySetInnerHTML={{__html: text}}/>
                </article>
              </li>
            )
          })}
        </ul>
      </Container>
    )
  }
});

export default connectToStores(Blog);
