var axios = require('axios');
var {API_BASE} = require('../constants.json');
var CollectionActions = require('../actions/collection');

const CollectionSource = {
  find: {
    remote(state) {
      return axios.get(`${API_BASE}${state.get('model')}`);
    },
    
    loading: CollectionActions.loading,
    success: CollectionActions.findSuccess, // (required)
    error: CollectionActions.error, // (required)
  },
};

module.exports = CollectionSource;
