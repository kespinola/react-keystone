import {createStore, applyMiddleware, combineReducers} from 'redux';
import promiseMiddleware from 'redux-promise';
import loggerMiddleware from 'redux-logger';
import { batchedUpdatesMiddleware } from 'redux-batched-updates';
import reducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  batchedUpdatesMiddleware,
  loggerMiddleware
)(createStore);

export default function configureStore (initialState = {}){
  return createStoreWithMiddleware(reducer, initialState);
};
