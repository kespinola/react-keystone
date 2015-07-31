var Alt = require('alt');
var RestStore = require('./stores/rest');
var RestActions = require('./actions/rest');

class Flux extends Alt{
	constructor(config = {}) {
		super(config);
		const models = config.models || [];
		
		models.forEach((model)=>{
			this.addStore(`${model}Store`, RestStore, {model});
		})
	}
}

var flux = new Flux({
	models:['Topic','Comment','Post','User']
});

module.exports = flux;
