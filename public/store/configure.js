import {createStore, applyMiddleware, combineReducers} from 'redux';
import promiseMiddleware from 'redux-promise';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { batchedUpdatesMiddleware } from 'redux-batched-updates';
import reducer from '../reducers';
import { Map } from 'immutable';

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  loggerMiddleware,
  thunkMiddleware
)(createStore);

export default function configureStore (initialState = Map({})){
  return createStoreWithMiddleware(reducer, initialState);
};
