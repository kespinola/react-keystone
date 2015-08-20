import {createAction} from 'redux-actions';
import fetch from 'isomorphic-fetch';
import {API_BASE} from '../constants';

export const FETCH_RESOURCE_REQUEST = 'FETCH_RESOURCE_REQUEST';
export const FETCHING_RESOURCE = 'FETCHING_RESOURCE';
export const FETCH_RESOURCE_SUCCESS = 'FETCH_RESOURCE_SUCCESS';
export const FETCH_RESOURCE_FAILURE = 'FETCH_RESOURCE_FAILURE';

export const fetchingResource = createAction(FETCHING_RESOURCE);
export const fetchSuccess = createAction(FETCH_RESOURCE_SUCCESS);
export const fetchFailure = createAction(FETCH_RESOURCE_FAILURE);
export const fetchRequest = createAction(FETCH_RESOURCE_REQUEST, request => {
  return fetch(`${API_BASE}${request.resource}`);
});
