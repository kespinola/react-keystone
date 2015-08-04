import CollectionSource from '../sources/collection';
import CollectionActions from '../actions/collection';
import _ from 'lodash';

class RestStore {
	
	constructor(){
		this.loading = true;
		this.data = [];
    
    console.log('extending from rest store');
    
    this.exportPublicMethods({
      find: this.find,
      findOne: this.findOne,
      getCollection: this.getCollection,
    });
    
    this.bindActions(CollectionActions);
    this.registerAsync(CollectionSource);
    
	}
  
	onListSuccess(payload){
    debugger;
		this.data = payload;
		this.loading = false;
	}
  
  onLoading(payload){
    this.loading = true;
  }
  
  onError(payload){
    console.log(payload);
  }
  
  getCollection(){
    return _.cloneDeep(this.data)
  }
	
	find(filter = {}){
    console.log(this);
    return _.filter(this.getCollection(), filter);
	}
	
	findOne(id){
		return _.find(this.getCollection(),{id});
	}
	
}

export default RestStore;
