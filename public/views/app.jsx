import React from 'react';
import {Link, RouteHandler, Navigation, State} from 'react-router';
import Layout from './_layout/base';
import {Grid, Row, Col, Nav}  from 'react-bootstrap';
import {NavItemLink} from 'react-router-bootstrap';
import Container from 'react-container';
import configureStore from '../store/configure';
import { Provider } from 'react-redux';
import { Map } from 'immutable';

const store = configureStore(Map({
  resources: Map({
    posts: Map({}),
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
