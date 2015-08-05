import CollectionSource from '../sources/collection';
import CollectionActions from '../actions/collection';
import _ from 'lodash';

class RestStore {
	
	constructor(model){
		this.loading = true;
		this.data = [];
    this.model = model;
    
    this.bindActions(CollectionActions);
    this.registerAsync(CollectionSource);
    
    console.log(this);
	}
  
	onFindSuccess(payload){
    console.log('find payload');
		this.data = payload;
		this.loading = false;
	}
  
  onLoading(payload){
    this.loading = true;
  }
  
  onError(payload){
    console.log(payload);
  }
	
}

export default RestStore;
