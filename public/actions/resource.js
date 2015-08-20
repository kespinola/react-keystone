import {createAction} from 'redux-actions';
import axios from 'axios';
import {API_BASE} from '../constants';

export const FETCH_RESOURCE = 'FETCH_RESOURCE';
export const CREATE_RESOURCE = 'CREATE_RESOURCE';
export const DESTROY_RESOURCE = 'DESTROY_RESOURCE';
export const PATCH_RESOURCE = 'PATCH_RESOURCE';
export const UPDATE_RESOURCE = 'UPDATE_RESOURCE';

export const fetchResource = createAction(FETCH_RESOURCE, req => {
  return axios.get(`${API_BASE}${req.resource}`)
}, req => (req));

export const createResource = createAction(CREATE_RESOURCE, req => {
  return axios.post(`${API_BASE}${req.resource}`, req.doc);
}, req => (req));

export const destroyResource = createAction(DESTROY_RESOURCE, req => {
  return axios.delete(`${API_BASE}${req.resource}/${req._id}`)
}, req => (req));

export const patchResource = createAction(PATCH_RESOURCE, req => {
  return axios.patch(`${API_BASE}${req.resource}/${req.doc._id}`, req.doc);
}, req => (req));

export const updateResource = createAction(UPDATE_RESOURCE);
