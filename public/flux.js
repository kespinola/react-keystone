var Alt = require('alt');
var RestStore = require('./stores/rest');
var RestActions = require('./actions/rest');

class Flux extends Alt{
	constructor(config = {}) {
		super(config);
		const models = config.models || [];
		
		models.forEach((model)=>{
			this.addStore(`${model}Store`, RestStore, true);
		})
	}
}

module.exports = new Flux({
	models:['Cateogry','Comment','Post','User']
});
