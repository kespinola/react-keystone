var RestActions = require('../actions/rest');
var _ = require('lodash');

class RestStore {
	
	constructor(config = {}){
		
		this.bindActions(RestActions);
		
		this.loading = true;
		this.data = [];
	}
	
	getCollection(){
		return _.cloneDeep(this.state.data);
	}
	
	onList(payload){
		this.data = payload;
		this.loading = false;
	}
	
	onCreate(payload){
		console.log(payload)
	}
	
	onGrab(payload){
		console.log(payload)
	}

	onEdit(payload){}
	
	onDelete(payload){
		console.log(payload)
	}
	
	static find(){
		return this.getCollection();
	}
	
	static findOne(id){
		return _.findOne(this.getCollection(),{id});
	}
	
}

module.exports = RestStore;
