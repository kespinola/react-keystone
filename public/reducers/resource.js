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

function mergeCollectionsFromHash(hash, name, collections){
  
  const map = fromJS(hash);
  
  return collections.set(name, collections.get('posts').mergeDeep(map));
  
}

const resourceReducer = handleActions({
  [FETCH_RESOURCE]:{
    next(state, action){
      const{
        payload,
        } = action;
      
      const{
        resource,
        } = action.meta;
      
      const meta = state.get('resources').get(resource);
      
      const hash = hashFromCollection(payload.data[resource], meta.get('primaryKey'));
      
      return state.set('collections', mergeCollectionsFromHash(hash, resource, state.get('collections')))
    },
    throw(state,action){}
  },
  [CREATE_RESOURCE]:{
    next(state, action){
      const{
        payload,
        } = action;
      const{
        resource,
        } = action.meta;
      const meta = state.get('resources').get(resource);
      const hash = hashFromCollection(payload.data[_s.rtrim(resource,'s')], meta.get('primaryKey'));
      return state.set('collections', mergeCollectionsFromHash(hash, resource, state.get('collections')));
    }
  },
  [DESTROY_RESOURCE]:{
    next(state, action){
      const{
        resource,
        key,
        } = action.meta;
      const collections = state.get('collections');
      const updated = collections.set(resource, collections.get(resource).delete(key ? key : '_id'));
      return state.set('collections', updated);
    }
  },
  [UPDATE_RESOURCE]:{
    next(state, action){
      const{
        resource,
        key,
        update,
        } = action.payload;
      const lookup = key ? key : '_id';
      const collections = state.get('collections');
      const resources = collections.get(resource);
      const current = resources.get(lookup);
      const updated = collections.set(resource, resources.set(lookup, current.merge(fromJS(update))));
      return state.set('collections', updated);
    }
  },
  [PATCH_RESOURCE]:{
    next(state, action){
      debugger;
      return state;
    }
  },
});

export default resourceReducer;
