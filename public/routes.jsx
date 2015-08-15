import React from 'react';
import Router, {Route, Redirect, DefaultRoute} from 'react-router';
import App from './views/app';
import Home from './views/home';
import constants from './constants.json';
import PostIndex from './views/post/index';
import PostView from './views/post/view';
import PostEdit from './views/post/edit';
import PostList from './views/post/list';


module.exports = (
  <Route handler={App}>
    <Route name='blog' handler={PostList}/>
    <Route name='post' handler={PostIndex}>
      <Route name='post.view' handler={PostView}/>
      <Route name='post.edit' handler={PostEdit}/>
    </Route>
    <Route name='home' handler={Home}/>
    <DefaultRoute handler={Home}/>
  </Route>
);
