var request = require('superagent');
var {API_BASE} = require('../constants.json');
var CollectionActions = require('../actions/collection');

const CollectionSource = {
  find: {

    remote(state) {
      console.log(state);
      return request.get(`${API_BASE}/${state.model}s`);
    },

    success: CollectionActions.listSuccess, // (required)

    error: CollectionActions.error, // (required)
    
  },

};
