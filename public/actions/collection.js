var request = require('superagent');
var {API_BASE} = require('../constants.json');
var alt = require('../alt');

const CollectionActions = alt.generateActions('findSuccess','error');

module.exports = CollectionActions;
