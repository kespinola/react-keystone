var React = require('react');
var Router, {Route, Redirect, DefaultRoute} = require('react-router');
var App = require('./views/app');
var Home = require('./views/home');
var Blog = require('./views/blog');

module.exports = (
  <Route path='/' name='App' handler={App}>
    <Route name='blog' handler={Blog}/>
		<DefaultRoute name='home'/>
  </Route>
);
