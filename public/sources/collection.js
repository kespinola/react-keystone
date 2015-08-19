import axios from 'axios';
import {API_BASE} from '../constants.json';
import CollectionActions from '../actions/collection';
import _s from 'underscore.string';
import _ from 'lodash';

const CollectionSource = {
  
  fetch: {
    remote(state, query = {}, projection = {}) {
      const {
        _id,
        } = query;
      const scope = _id ? `/${_id}` : '';
      //GET '/api/v1/posts(/:_id)'
      return axios.get(`${API_BASE}${state.get('resource')}${scope}`)
    },
    loading: CollectionActions.loading,
    success: CollectionActions.fetchSuccess, // (required)
    error: CollectionActions.error, // (required),
    
  },
  
  patch: {
    remote(state, key){
      let item = state.get('data').get(key).toJS();
      
      state.get('waitOn').forEach( store => {
        const many = store.getState().get('resource');
        const one = _s.rtrim(many,'s');
        if(item.hasOwnProperty(one)){
          item[one] = item[one]._id;
        }else if(item.hasOwnProperty(many)){
          item[many] = item[many].map(obj => { return obj._id });
        }
      });
      //PATCH '/api/v1/posts/:_id'
      return axios.patch(`${API_BASE}${state.get('resource')}/${item._id}`, item)
    },
    loading: CollectionActions.loading,
    success: CollectionActions.patchSuccess, // (required)
    error: CollectionActions.error, // (required)
  },
  
  create:{
    remote(state, doc){
      //POST '/api/v1/posts'
      return axios.post(`${API_BASE}${state.get('resource')}`, doc);
    },
    loading: CollectionActions.loading,
    success: CollectionActions.createSuccess, // (required)
    error: CollectionActions.error, // (required)
  },

  destroy:{
    remote(state, _id){
      //DELETE '/api/v1/posts/:_id'
      return axios.delete(`${API_BASE}${state.get('resource')}/${_id}`);
    },
    loading: CollectionActions.loading,
    success: CollectionActions.destroySuccess, // (required)
    error: CollectionActions.error, // (required)
  },
};

module.exports = CollectionSource;
