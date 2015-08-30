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
  
  return collections.set(name, collections.get(name).mergeDeep(map));
  
}

function updateDoc(state, action){
  const{
    payload,
    } = action;
  const{
    resource,
    } = action.meta;
  const meta = state.get('resources').get(resource);
  const hash = hashFromCollection(payload.data[meta.get('keys').get('singular')]);
  return state.set('collections', mergeCollectionsFromHash(hash, resource, state.get('collections')));
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
      return updateDoc(state, action)
    }
  },
  [DESTROY_RESOURCE]:{
    next(state, action){
      const{
        resource,
        key,
        } = action.meta;
      const collections = state.get('collections');
      const updated = collections.set(resource, collections.get(resource).delete('_id'));
      return state.set('collections', updated);
    }
  },
  [PATCH_RESOURCE]:{
    next(state, action){
      return updateDoc(state, action);
    }
  },
});

export default resourceReducer;
