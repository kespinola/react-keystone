import React from 'react';
import { Link, RouteHandler, Navigation, State } from 'react-router';
import Layout from './_layout/base';
import {Grid, Row, Col, Nav}  from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';
import configureStore from '../store/configure';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import cx from 'classnames';
import Form from 'react-formal';
import _ from 'lodash';

/*Plugin configure*/

Form.addInputTypes(
  require('react-formal-inputs')
);

/*Resource Definition Imports*/

import posts from './post/definition';

const store = configureStore(Map({
  collections: Map({
    posts: Map({})
  }),
  resources: Map({
    posts,
    topics: Map({}),
    users: Map({})
  }),
}));

const App = React.createClass({
  
  mixins:[Navigation, State],
  
	getDefaultProps(){
		return {
			nav: [
				{route:'home', text: 'Home'},
				{route: 'post.list', text: 'Blog'}
			]
		}
	},
  
  _getClassName(){
    const routes = _.reduce(this.getRoutes(),(memo, route) =>{
      memo[route.name] = true;
    },{});
    return cx(routes);
  },
  
	render(){
		const {
			nav
			} = this.props;
		return(
      <Provider store={store}>
        {()=>{
          return (
            <Layout {... this.props}>
              <Grid fluid={true}>
                <Row>
                  <Col xs={12} sm={3} lg={2}>
                    <Nav bsStyle='pills' stacked activeKey={1}>
                      {nav.map((item)=>{
                        const{
                          route,
                          } = item;
                        return <NavItemLink key={route} eventKey={route} to={route}>{item.text}</NavItemLink>
                      })}
                    </Nav>
                  </Col>
                  <Col xs={12} sm={9} lg={10}>
                    <RouteHandler/>
                  </Col>
                </Row>
              </Grid>
            </Layout>
          )
        }}
      </Provider>
		)
	}
});

export default App;
