var request = require('superagent');
var {API_BASE} = require('../constants.json');

class CollectionActions{
  
  constructor(){
    this.generateActions(
      'error',
      'listSuccess'
    )
  }
  
}

module.exports = CollectionActions;
