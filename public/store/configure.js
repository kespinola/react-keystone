import {createStore, applyMiddleware, combineReducers} from 'redux';
import promiseMiddleware from 'redux-promise';
import loggerMiddleware from 'redux-logger';
import { batchedUpdatesMiddleware } from 'redux-batched-updates';
import reducer from '../reducers';
import { Map } from 'immutable';

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  loggerMiddleware
)(createStore);

export default function configureStore (initialState = Map({})){
  return createStoreWithMiddleware(reducer, initialState);
};
