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
      // '/api/v1/posts(/:_id)'
      console.log('getting resource from url', `${API_BASE}${state.get('resource')}${scope}`);
      return axios.get(`${API_BASE}${state.get('resource')}${scope}`)
    },
    loading: CollectionActions.loading,
    success: CollectionActions.fetchSuccess, // (required)
    error: CollectionActions.error, // (required)
    
    shouldFetch(state, query) {
      return true;
    }
    
  }
};

module.exports = CollectionSource;
