import {FETCH_RESOURCE} from '../actions/resource';
import {handleActions} from 'redux-actions';
import {Map, fromJS} from 'immutable';

const resourceReducer = handleActions({
  [FETCH_RESOURCE]:{
    next(state, action){
      const{
        payload,
        } = action;
      
      const{
        resource,
        } = action.meta;
      
      const resources = state.get('resources');
      
      const hash = _.reduce(payload[resource],(memo, obj) =>{
        memo[obj._id] = obj;
        return memo;
      },{});
      
      const Map = fromJS(hash);
      
      return state.set('resources', resources.set(resource, Map.merge(resources.get(resource))))
    },
    throw(state,action){}
  },
});

export default resourceReducer;
