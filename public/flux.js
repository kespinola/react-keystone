var Alt = require('alt');
var RestStore = require('./stores/rest');
var RestActions = require('./actions/rest');

class Flux extends Alt{
	constructor(models = []) {
		super(models);
    
    this.addActions('restActions',RestActions);
    
		models.forEach((model)=>{
			this.addStore(model, RestStore, true);
		});
    
	}
}

var flux = new Flux(['Topic','Comment','Post','User']);

module.exports = flux;
