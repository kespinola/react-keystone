import { 
  FETCH_RESOURCE, 
  CREATE_RESOURCE, 
  DESTROY_RESOURCE,
  UPDATE_RESOURCE,
  PATCH_RESOURCE,
  } from '../actions/resource';
import { handleActions } from 'redux-actions';
import { Map, fromJS } from 'immutable';
import _s from 'underscore.string';

function hashFromCollection(collection, key = '_id'){
  
  collection = _.isArray(collection) ? collection : [collection];
  return _.reduce(collection, (memo, obj) =>{
    const id = obj[key];
    memo[id] = obj;
    return memo;
  },{});
  
}

function upsert(state, action){
  const {
    payload,
    } = action;
  const {
    def,
    } = action.meta;
  const resource = def.get('name');
  const collection = state.get('collections').get(resource);
  const doc = payload.data[def.get('keys').get('singular')];
  const {
    _id,
    } = doc;
  const map = fromJS(doc);
  const collections = state.get('collections').set(resource, collection.set(_id, collection.has(_id) ? collection.get(_id).mergeDeep(map) : map));
  return state.set('collections', collections) ;
}

const resourceReducer = handleActions({
  [FETCH_RESOURCE]:{
    next(state, action){
      const{
        payload,
        } = action;
      
      const{
        resources,
        } = action.meta;
      
      const collections = _.reduce(payload, (memo, result, i) => {
        const resource = resources[i];
        const hash = hashFromCollection(result.data[resource]);
        return _.merge(memo, {[resource]:fromJS(memo[resource]).mergeDeep(fromJS(hash))});
      }, state.get('collections').toJS());
      
      return state.set('collections', fromJS(collections));
    },
    throw(state,action){}
  },
  [CREATE_RESOURCE]:{
    next(state, action){
      return upsert(state, action);
    }
  },
  [DESTROY_RESOURCE]:{
    next(state, action){
      const{
        def,
        _id,
        } = action.meta;
      const resource = def.get('name');
      const collections = state.get('collections');
      const update = collections.set(resource, collections.get(resource).delete(_id));
      return state.set('collections', update);
    }
  },
  [PATCH_RESOURCE]:{
    next(state, action){
      return upsert(state, action);
    }
  },
});

export default resourceReducer;
