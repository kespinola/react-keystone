var request = require('superagent');
var thenPlugin = require('superagent-then');
var {API_BASE} = require('../constants.json');
var CollectionActions = require('../actions/collection');

const CollectionSource = {
  find: {
    remote(state) {
      console.log(state, `${API_BASE}${state.model}s`);
      return request.get(`${API_BASE}${state.model}s`).use(thenPlugin);
    },
    success: CollectionActions.findSuccess, // (required)
    error: CollectionActions.error, // (required)
  },
};

module.exports = CollectionSource;
