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

import EventIndex from './views/event/index';
import EventView from './views/event/view';
import EventEdit from './views/event/edit';
import EventList from './views/event/list';
import EventCreate from './views/event/create'

export default (
    <Route handler={App}>
      <Route name='post.index' handler={PostIndex}>
        <Route name='post.list' path='/blog' handler={PostList}/>
        <Route name='post.create' path='/post/create' handler={PostCreate}/>
        <Route name='post.view' path='/post/:_id'  handler={PostView}/>
        <Route name='post.edit' path='/post/:_id/edit' handler={PostEdit}/>
        <DefaultRoute handler={PostList}/>
      </Route>
      <Route name='event.index' handler={EventIndex}>
        <Route name='event.list' path='/calendar' handler={EventList}/>
        <Route name='event.create' path='/event/create' handler={EventCreate}/>
        <Route name='event.view' path='/event/:_id'  handler={EventView}/>
        <Route name='event.edit' path='/event/:_id/edit' handler={EventEdit}/>
        <DefaultRoute handler={EventList}/>
      </Route>
      <Route name='home' handler={Home}/>
      <DefaultRoute handler={Home}/>
    </Route>
);
