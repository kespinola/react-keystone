import React from 'react';
import Container from 'react-container';
import {Link} from 'react-router';
import {Label} from 'react-bootstrap';
import moment from 'moment';

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
            text,
            topics,
            user,
            publishedDate,
            } = item.toJS();
          return (
            <article key={_id}>
              <h1><Link to="blog.view" params={{_id}}>{title}</Link></h1>
              {user ? <h3>{`Written by ${user.name.first} ${user.name.last} on ${moment(publishedDate).format('MMMM DD YYYY')}`}</h3> : null}
              <div dangerouslySetInnerHTML={{__html: text}}/>
              <ul className="inline-list">
                {topics.map((topic)=>{
                  return <li><Label key={topic._id} bsStyle='default'>{topic.name}</Label></li>
                })}
              </ul>
            </article>
          )
        })}
      </Container>
    )
  }
});

export default List;
