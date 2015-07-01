var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var App = require('./views/app');
var Home = require('./views/home');
var Blog = require('./views/blog');

module.exports = (
  <Route path='/' handler={App}>
    <Route path='blog' name='blog' handler={Blog}/>
    <DefaultRoute name='home' handler={Home}/>
  </Route>
);