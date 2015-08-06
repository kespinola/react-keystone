import React from 'react';
import Container from 'react-container';
import connectToStores from 'alt/utils/connectToStores';
import PostStore from '../stores/post';
var axios = require('axios');
var {API_BASE} = require('../constants.json');

const Blog = React.createClass({
  statics: {
    getStores(props) {
      return [PostStore]
    },
    getPropsFromStores(props) {
      return {
        postStore:PostStore.getState(),
      }
    }
  },
  render(){
    const{
      postStore,
      } = this.props;
    return (
      <Container direction='column'>
        <h1>Blog</h1>
        <ul>
          {postStore.get('data').toArray().map((map)=>{
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
  },
  
  componentDidMount(){
    if(this.props.postStore.get('data').count() == 0) PostStore.find();
  }
});

export default connectToStores(Blog);
