import React from 'react';
import Container from 'react-container';
import {Link} from 'react-router';

const List = React.createClass({
  render(){
    const{
      State,
      } = this.props;
    return (
      <Container>
        <h1>Blog</h1>
        {State.get('data').toArray().map((item)=>{
          const{
            _id,
            title,
            text
            } = item.toJS();
          
          return (
            <article key={_id}>
              <h1><Link to="blog.view" params={{_id}}>{title}</Link></h1>
              <div dangerouslySetInnerHTML={{__html: text}}/>
            </article>
          )
        })}
      </Container>
    )
  }
});

export default List;
