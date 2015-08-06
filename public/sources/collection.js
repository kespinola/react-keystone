var axios = require('axios');
var {API_BASE} = require('../constants.json');
var CollectionActions = require('../actions/collection');

const CollectionSource = {
  find: {
    remote(state) {
      console.log(`${API_BASE}${state.get('model')}`);
      return axios.get(`${API_BASE}${state.get('model')}`);
    },
    
    local(state){
      return state.get('data');
    },
    
    shouldFetch(state){
      return state.get('data').count() === 0;
    },
    
    loading: CollectionActions.loading,
    success: CollectionActions.findSuccess, // (required)
    error: CollectionActions.error, // (required)
  },
};

module.exports = CollectionSource;
