var axios = require('axios');
var {API_BASE} = require('../constants.json');
var CollectionActions = require('../actions/collection');

const CollectionSource = {
  fetch: {
    remote(state) {
      return axios.get(`${API_BASE}${state.get('resource')}`);
    },
    
    local(state){
      return state.get('data');
    },
    loading: CollectionActions.loading,
    success: CollectionActions.fetchSuccess, // (required)
    error: CollectionActions.error, // (required)

    shouldFetch(state) {
      return state.get('data').count() === 0;
    }
    
  },
};

module.exports = CollectionSource;
