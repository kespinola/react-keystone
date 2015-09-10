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
            <h1>Calendar</h1>
          </Col>
          <Col xs={12} sm={6} className='text-right'>
            <ButtonLink to='event.create' bsStyle='primary'>+ Create Event</ButtonLink>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {this.props.collection.toArray().map( item => {
              const{
                _id,
                title,
                description,
                topics,
                host,
                date,
                } = item.toJS();
              return (
                <Row componentClass='article' key={_id}>
                  <Col xs={7} sm={10}>
                    <h1><Link to="event.view" params={{_id}}>{title}</Link></h1>
                    {host ? <h3>{`Hosted by ${host.name.first} ${host.name.last}`}</h3> : null}
                    {date ? <h4>{`${moment(date).format('MMMM DD YYYY')}`}</h4> : null}
                  </Col>
                  <Col xs={5} sm={2} className='text-right'>
                    <DropdownButton bsStyle='link' title='...' className='inline-block' noCaret>
                      <MenuItemLink to='event.edit' params={{_id}}>Edit</MenuItemLink>
                      <MenuItem bsStyle='danger' onSelect={this._handleDestroy.bind(null, _id)}>Delete</MenuItem>
                    </DropdownButton>
                  </Col>
                  <Col xs={12}>
                    <div dangerouslySetInnerHTML={{__html: description}}/>
                    <ul className="inline-list">
                      {topics.map( topic => {
                        return <li key={topic._id}><Label bsStyle='default'>{topic.name}</Label></li>
                      })}
                    </ul>
                  </Col>
                </Row>
              )
            })}
          </Col>
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
