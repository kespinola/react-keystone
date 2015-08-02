var React = require('react');
var Router, {Route, Redirect, DefaultRoute} = require('react-router');
var App = require('./views/app.jsx');
var Home = require('./views/home.jsx');
var Blog = require('./views/blog.jsx');

module.exports = (
  <Route handler={App}>
		<DefaultRoute handler={Home}/>
  </Route>
);
