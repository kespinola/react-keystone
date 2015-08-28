import React from 'react';
import {Link} from 'react-router';
import {Label,Button, Grid, Row, Col, DropdownButton, MenuItem} from 'react-bootstrap';
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
          <Col xs={12}>
            {this.props.collection.toArray().map((item)=>{
              const{
                _id,
                slug,
                title,
                text,
                topics,
                user,
                publishedDate,
                } = item.toJS();
              return (
                <Row componentClass='article' key={_id}>
                  <Col xs={7} sm={10}>
                    <h1><Link to="post.view" params={{slug}}>{title}</Link></h1>

                  </Col>
                  <Col xs={5} sm={2} className='text-right'>
                    <DropdownButton bsStyle='link' title='...' className='inline-block' noCaret>
                      <MenuItemLink to='post.edit' params={{slug}}>Edit</MenuItemLink>
                      <MenuItem bsStyle='danger' onSelect={this._handleDestroy.bind(null, slug)}>Delete</MenuItem>
                    </DropdownButton>
                  </Col>
                  <Col xs={12}>
                    <div dangerouslySetInnerHTML={{__html: text}}/>
                  </Col>
                </Row>
              )
            })}
          </Col>
        </Row>
      </Grid>
    )
  },
  
  _handleDestroy(slug){
    const{
      data,
      } = this.props;
    const doc = data.get(slug);
    this.props.destroy({resource:'posts', _id:doc.get('_id'), key:slug})
  }
  
});

export default List;
