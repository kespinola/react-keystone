import _ from 'lodash';
import immutable from 'alt/utils/ImmutableUtil';
import Immutable from 'immutable';
import CollectionSource from '../sources/collection';
import CollectionActions from '../actions/collection';
import _s from 'underscore.string';

function join(ids, map){
  return ids.map((id)=>{
    return map.get(id)
  });
}

class CollectionStore {
	
	constructor(config){
    const{
      resource,
      } = config;
    
    this.waitOn = config.waitOn || [];
    this.joins = [];

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
    
    let data = _.reduce(payload.data[this.state.get('resource')],(memo, obj)=>{
      
      this.waitOn.forEach((store)=>{
        const collection = store.getState().get('data');
        const group = store.getState().get('resource');
        const single = _s.rtrim(group,"s");
        
        if(obj[group]){
          obj[group] = obj[group].map((id)=>{
            return collection.get(id);
          })
        }else if(obj[single]){
         obj[single] = collection.get(obj[single]); 
        }
        
      });
      
      memo[obj._id] = obj;
      
      return memo;
      
    },{});
    
    data = Immutable.fromJS(data);
    this.setState(this.state.set('data', data.merge(this.state.get('data'))));
	}
  
  onError(payload){
    console.log("Error", payload);
  }
  
}

export default immutable(CollectionStore);
