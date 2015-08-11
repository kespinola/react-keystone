import React from 'react';
import {Link, RouteHandler, Navigation} from 'react-router';
import Layout from './_layout/base';
import {Grid, Row, Col, Nav}  from 'react-bootstrap';
import {NavItemLink} from 'react-router-bootstrap';
import Container from 'react-container';

const App = React.createClass({
  
  mixins:[Navigation],
  
	getDefaultProps(){
		return {
			nav: [
				{route:'home', text: 'Home'},
				{route: 'blog', text: 'Blog'}
			]
		}
	},
	render(){
		const {
			nav
			} = this.props;
		return(
			<Layout {... this.props}>
        <Grid fluid={true}>
          <Row>
            <Col xs={12} sm={3} lg={2}>
              <Nav bsStyle='pills' stacked activeKey={1} onSelect={this._handleSelect}>
                {nav.map((item)=>{
                  const{
                    route,
                    } = item;
                  return <NavItemLink key={route} eventKey={route} to={route}>{item.text}</NavItemLink>
                })}
              </Nav>
            </Col>
            <Col xs={12} sm={9} lg={10}>
              <RouteHandler {... this.props}/>
            </Col>
          </Row>
        </Grid>
			</Layout>
		)
	}
});

export default App;
