import {createAction} from 'redux-actions';
import fetch from 'isomorphic-fetch';
import {API_BASE} from '../constants';

export const FETCH_RESOURCE = 'FETCH_RESOURCE';
export const CREATE_RESOURCE = 'CREATE_RESOURCE';
export const DESTROY_RESOURCE = 'DESTROY_RESOURCE';

export const fetchResource = createAction(FETCH_RESOURCE, request => {
  return fetch(`${API_BASE}${request.resource}`).then(res => res.json())
}, request => (request));

export const createResource = createAction(CREATE_RESOURCE, request => {
  return fetch(`${API_BASE}${request.resource}`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request.doc),
    }).then(res => res.json())
}, request => (request));

export const destroyResource = createAction(DESTROY_RESOURCE, request => {
  return fetch(`${API_BASE}${request.resource}/${request._id}`, {
    method: 'delete',
  })
}, request => (request));
