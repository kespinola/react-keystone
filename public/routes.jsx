import React from 'react';
import Router, { Route, Redirect, DefaultRoute } from 'react-router';
import { history } from 'react-router/lib/History';
import { reduxRouteComponent } from 'redux-react-router';
import configureStore from './store/configure';
import { Map } from 'immutable';

import App from './views/app';
import Home from './views/home';
import PostIndex from './views/post/index';
import PostView from './views/post/view';
import PostEdit from './views/post/edit';
import PostList from './views/post/list';
import PostCreate from './views/post/create'

export default (
    <Route handler={App}>
      <Route name='post.index' handler={PostIndex}>
        <Route name='post.list' path='/blog' handler={PostList}/>
        <Route name='post.create' path='/post/create' handler={PostCreate}/>
        <Route name='post.view' path='/post/:slug'  handler={PostView}/>
        <Route name='post.edit' path='/post/:slug/edit' handler={PostEdit}/>
        <DefaultRoute handler={PostList}/>
      </Route>
      <Route name='home' handler={Home}/>
      <DefaultRoute handler={Home}/>
    </Route>
);
