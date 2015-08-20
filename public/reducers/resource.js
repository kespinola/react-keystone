import { FETCH_RESOURCE, CREATE_RESOURCE, DESTROY_RESOURCE } from '../actions/resource';
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
  
  const Map = fromJS(hash);
  
  return collections.set(name, Map.mergeDeep(collections.get('posts')));
  
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
      
      const hash = hashFromCollection(payload[resource], meta.get('primaryKey'));
      
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
      const hash = hashFromCollection(payload[_s.rtrim(resource,'s')], meta.get('primaryKey'));
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
      const update = collections.set(resource, collections.get(resource).delete(key ? key : '_id'));
      return state.set('collections', update);
    }
  }
});

export default resourceReducer;
