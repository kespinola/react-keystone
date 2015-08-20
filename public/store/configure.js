import {createStore, applyMiddleware, combineReducers} from 'redux';
import promiseMiddleware from 'redux-promise';
import loggerMiddleware from 'redux-logger';
import batchUpdatesMiddleWare from 'redux-batched-updates';
import * as reducers from '../reducers';

const reducer = combineReducers(reducers);
const createStoreWithMiddleWare = applyMiddleware(
  promiseMiddleware,
  batchUpdatesMiddleWare,
  loggerMiddleware
)(createStore);

export default function configureStore(initialState){
  return createStoreWithMiddleWare(reducer, initialState);
}
