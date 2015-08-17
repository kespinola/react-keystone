var axios = require('axios');
var {API_BASE} = require('../constants.json');
var CollectionActions = require('../actions/collection');

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
    remote(state, _id){
      //PATCH '/api/v1/posts/:_id'
      return axios.patch(`${API_BASE}${state.get('resource')}/${_id}`, state.get('data').get(_id).toJS())
    },
    loading: CollectionActions.loading,
    success: CollectionActions.saveSuccess, // (required)
    error: CollectionActions.error, // (required)
  }
};

module.exports = CollectionSource;
