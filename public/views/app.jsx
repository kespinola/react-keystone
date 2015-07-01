var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Layout = require('./layout.jsx');
var Link = Router.Link;

var App = React.createClass({
  render(){
    return(
      <Layout {... this.props}>
        <Link to="home">Home</Link>
        <Link to="blog">Blog</Link>
        <RouteHandler {... this.props}/>
      </Layout>
    )
  }
});

module.exports = App;