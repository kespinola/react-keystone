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
    remote(state){
      return axios.put(`${API_BASE}${state.get('re')}`)
    } 
  },
};

module.exports = CollectionSource;
