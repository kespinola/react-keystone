import React from 'react';
import Router, {Route, Redirect, DefaultRoute} from 'react-router';
import App from './views/app';
import Home from './views/home';
import constants from './constants.json';

const{
  AREAS,
  } = constants;

module.exports = (
  <Route handler={App}>
    {AREAS.map((area)=>{
      return (
        <Route name={`${area}`} handler={require(`./views/${area}/index`)}>
          <Route name={`${area}.list`} handler={require(`./views/${area}/list`)} />
          <Route name={`${area}.view`} path=":_id" handler={require(`./views/${area}/view`)} />
          <Route name={`${area}.edit`} path=":_id/edit" handler={require(`./views/${area}/edit`)} />
          <DefaultRoute handler={require(`./views/${area}/list`)} />
        </Route>
      )
    })}
    <Route name='home' handler={Home}/>
    <DefaultRoute handler={Home}/>
  </Route>
);
