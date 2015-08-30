import {createAction} from 'redux-actions';
import axios from 'axios';
import {API_BASE} from '../constants';
import _ from 'lodash';

export const FETCH_RESOURCE = 'FETCH_RESOURCE';
export const CREATE_RESOURCE = 'CREATE_RESOURCE';
export const DESTROY_RESOURCE = 'DESTROY_RESOURCE';
export const PATCH_RESOURCE = 'PATCH_RESOURCE';

export const fetchResources = createAction(FETCH_RESOURCE, req => {
  const requests = _.reduce(req.resources, (memo, resource) => {
    memo.push(axios.get(`${API_BASE}${resource}`));
    return memo;
  },[]);
  return axios.all(requests);
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

export function findResource(req){
  return (dispatch, getState) => {
    const state = getState();
    const query = req.query ? req.query : {};
    const {
      resource
      } = req;
    const collection = state.get('collections').get(resource).toArray().map(obj => obj.toJS());
    const populate = state.get('resources').get(resource).get('populate').toArray();
    if(!_.filter(collection, query).length) dispatch(fetchResources(_.assign(req, {resources:populate.concat(resource)})));
  }
}
