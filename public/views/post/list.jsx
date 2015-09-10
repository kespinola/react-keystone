import React from 'react';
import {Link} from 'react-router';
import {Label,Button, Grid, Row, Col, DropdownButton, MenuItem, Thumbnail} from 'react-bootstrap';
import {ButtonLink, MenuItemLink} from 'react-router-bootstrap';
import moment from 'moment';

const List = React.createClass({
  
  render(){
    return (
      <Grid fluid={true}>
        <Row>
          <Col xs={12} sm={6}>
            <h1>Blog</h1>
          </Col>
          <Col xs={12} sm={6} className='text-right'>
            <ButtonLink to='post.create' bsStyle='primary'>+ Create Post</ButtonLink>
          </Col>
        </Row>
        <Row>
          {this.props.collection.toArray().map( item => {
            const{
              _id,
              title,
              text,
              topics,
              user,
              images,
              publishedDate,
              } = item.toJS();
            return (
              <Col xs={12} sm={6}>
                <Thumbnail src={images.length ? images[0].url : ''}>
                  <Row componentClass='article' key={_id}>
                    <Col xs={7} sm={10}>
                      <h1><Link to="post.view" params={{_id}}>{title}</Link></h1>
                      {user ? <h3>{`Written by ${user.name.first} ${user.name.last} on ${moment(publishedDate).format('MMMM DD YYYY')}`}</h3> : null}
                    </Col>
                    <Col xs={5} sm={2} className='text-right'>
                      <DropdownButton bsStyle='link' title='...' className='inline-block' noCaret>
                        <MenuItemLink to='post.edit' params={{_id}}>Edit</MenuItemLink>
                        <MenuItem bsStyle='danger' onSelect={this._handleDestroy.bind(null, _id)}>Delete</MenuItem>
                      </DropdownButton>
                    </Col>
                    <Col xs={12}>
                      <div dangerouslySetInnerHTML={{__html: text}}/>
                      <ul className="inline-list">
                        {topics.map( topic => {
                          return <li key={topic._id}><Label bsStyle='default'>{topic.name}</Label></li>
                        })}
                      </ul>
                    </Col>
                  </Row>
                </Thumbnail>
              </Col>
            )
          })}
        </Row>
      </Grid>
    )
  },
  
  _handleDestroy(_id){
    const {
      def,
      } = this.props;
    this.props.destroy({def, _id})
  }
  
});

export default List;
