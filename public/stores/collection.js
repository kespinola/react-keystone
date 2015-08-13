import _ from 'lodash';
import immutable from 'alt/utils/ImmutableUtil';
import Immutable from 'immutable';
import CollectionSource from '../sources/collection';
import CollectionActions from '../actions/collection';

class RestStore {
	
	constructor(options){
    const{
      resource,
      } = options;
    
    this.waitOn = options.waitOn || [];

    this.waitOn.forEach((store)=>{
      store.fetch();
    });
    
    this.state = Immutable.Map({
      resource,
      data: Immutable.Map({}),
    });
    
    this.bindActions(CollectionActions);
    this.registerAsync(CollectionSource);
	}
  
	onFetchSuccess(payload){
    
    this.waitFor(this.waitOn);
    
    this.waitOn.forEach((store)=>{
      console.log(store.getState());
    });
    
    let data = _.reduce(payload.data[this.state.get('resource')],(memo, obj)=>{
      memo[obj._id] = obj;
      return memo;
    },{});
    
    data = Immutable.fromJS(data);
    
    this.setState(this.state.set('data', data.merge(this.state.get('data'))));
	}
  
  onError(payload){
    console.log(payload);
  }
  
  static find(query){
    this.getState().get('data')
  }
  
  static findOne(query){
    
  }
	
}

export default immutable(RestStore);
