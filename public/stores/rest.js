import RestActions from '../actions/rest';
import _ from 'lodash';

class RestStore {
	
	constructor(model){
    
		this.loading = true;
		this.data = [];
    
    this.alt.getActions('restActions').load()
    
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
	
	static find(filter = {}){
    const collection = _.cloneDeep(this.state.data);
    return _.filter(collection, filter);
	}
	
	static findOne(id){
		return _.find(_.cloneDeep(this.state.data),{id});
	}
	
}

module.exports = RestStore;
