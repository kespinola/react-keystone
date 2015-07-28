import RestActions from '../actions/rest';
import _ from 'lodash';

class RestStore {
	
	constructor(config = {}){
		this.bindActions(RestActions);
		
		if(!config.model) throw Errow("The store needs a model passed in through the config.");
		
		this.model = config.model;
	}
	
	onList(payload){
		this.setState({[this.model]:payload});
	}
	
	onCreate(){}
	
	onGrab(){}

	onEdit(){}
	
	onDelete(){}
	
	getCollection(){
		return this.getState()[this.model]
	}
	
	static find(){
		return this.getCollection();
	}
	
	static findOne(id){
		return _.findOne(this.getCollection(),{id});
	}
	
}

export default RestStore;
