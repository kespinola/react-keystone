import _ from 'lodash';
import immutable from 'alt/utils/ImmutableUtil';
import Immutable from 'immutable';
import CollectionSource from '../sources/collection';
import CollectionActions from '../actions/collection';
import _s from 'underscore.string';

class CollectionStore {
	
	constructor(config){
    const{
      resource,
      actions,
      } = config;
    
    this.waitOn = config.waitOn || [];
    this.actions = actions || [];
    this.actions = this.actions.concat(CollectionActions);
    
    
    this.state = Immutable.Map({
      resource,
      waitOn:this.waitOn,
      data: Immutable.Map({}),
    });
    
    this.registerAsync(CollectionSource);
    
    this.waitOn.forEach(store => {
      store.fetch();
    })
    
    this.actions.forEach( action => {
      this.bindActions(action);  
    });
    
	}
  
	onFetchSuccess(payload){
    
    this.waitFor(this.waitOn);
    
    let data = payload.data[this.state.get('resource')] || [];
    
    console.log(data);
    
    data = _.reduce(data,(memo, obj)=>{
      
      this.waitOn.forEach(store => {
        const collection = store.getState().get('data');
        const many = store.getState().get('resource');
        const single = _s.rtrim(many,"s");
        
        if(obj[many]){
          obj[many] = obj[many].map((id)=>{
            return collection.get(id);
          })
        }else if(obj[single]){
         obj[single] = collection.get(obj[single]); 
        }
        
      });
      
      memo[obj._id] = obj;
      
      return memo;
      
    },{});
    this.setState(this.state.set('data', Immutable.fromJS(data).merge(this.state.get('data'))));
	}
  
  onSaveSuccess(payload){
    console.log('save success', payload);
  }
  
  onError(response){
    if (response instanceof Error) {
      // Something happened in setting up the request that triggered an Error
      console.log(response.message);
    } else {
      // The request was made, but the server responded with a status code
      // that falls out of the range of 2xx
      console.log(response.data);
      console.log(response.status);
      console.log(response.headers);
      console.log(response.config);
    }
  }
  
  onUpdate(payload){
    const{
      _id,
      update
      } = payload;
    const data = this.state.get('data');
    const updated = data.get(_id).set(update.key, update.value);
    this.setState(this.state.set('data',data.set(_id,updated)));
  }
}

export default immutable(CollectionStore);
