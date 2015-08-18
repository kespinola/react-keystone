import _ from 'lodash';
import alt from '../alt';
import immutable from 'alt/utils/ImmutableUtil';
import Immutable from 'immutable';
import CollectionSource from '../sources/collection';
import CollectionActions from '../actions/collection';
import _s from 'underscore.string';

function join(data, key, dependencies){
  return _.reduce(data, (memo, obj)=>{

    dependencies.forEach(store => {
      const collection = store.getState().get('data');
      const many = store.getState().get('resource');
      const single = _s.rtrim(many,'s');

      if(obj[many]){
        obj[many] = obj[many].map( id => {return collection.get(id)});
      }else if(obj[single]){
        obj[single] = collection.get(obj[single]);
      }

    });
    
    memo[obj[key]] = obj;
    
    return memo;
    
  },{});
}

class CollectionStore {
	
	constructor(config = {}){
    const{
      resource,
      actions,
      } = config;

    const primaryKey = config.primaryKey || "_id";
    
    this.waitOn = config.waitOn || [];
    this.actions = actions || [];
    this.actions = this.actions.concat(CollectionActions);

    this.registerAsync(CollectionSource);

    this.waitOn.forEach(store => {
      store.fetch();
    });

    this.actions.forEach( action => {
      this.bindActions(action);
    });
    
    this.state = Immutable.Map({
      resource,
      primaryKey,
      actions:this.actions,
      waitOn:this.waitOn,
      data: Immutable.Map({}),
    });
    
	}
  
	onFetchSuccess(payload){
    
    this.waitFor(this.waitOn);
    
    let data = payload.data[this.state.get('resource')] || [];
    const key = this.state.get('primaryKey');
    
    data = join(data, key, this.waitOn);
    
    this.setState(this.state.set('data', Immutable.fromJS(data).merge(this.state.get('data'))));
	}
  
  //@TODO: Figure out why this is not binding correctly
  onPatchSuccess(payload){
    console.log('patch success');
    const key = this.state.get('primaryKey');
    const collection = this.state.get('data');
    const lookup = doc[key];
    let doc = payload.data[_s.rtrim(this.state.get('resource'))];
    console.log('save success', doc);
    doc = join(doc, key, this.state.get('waitOn'));
    this.setState(this.state.set('data', collection.set(doc[key], Immutable.fromJS(doc).merge(collection.get(lookup)))));
    console.log(this.state.get('data').toJS())
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
      key,
      update
      } = payload;
    const data = this.state.get('data');
    const updated = data.get(key).set(update.key, update.value);
    this.setState(this.state.set('data',data.set(key,updated)));
  }
}

export default immutable(CollectionStore);
