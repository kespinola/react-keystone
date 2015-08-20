import {createAction} from 'redux-actions';
import fetch from 'isomorphic-fetch';
import {API_BASE} from '../constants';

export const FETCH_RESOURCE = 'FETCH_RESOURCE';

export const fetchResource = createAction(FETCH_RESOURCE, request => {
  return fetch(`${API_BASE}${request.resource}`).then(req => req.json())
},request => (request));
