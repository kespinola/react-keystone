import {FETCH_RESOURCE_REQUEST, FETCHING_RESOURCE, FETCH_RESOURCE_SUCCESS, FETCH_RESOURCE_FAILURE} from '../actions/resource';
import {handleActions} from 'redux-actions';
import {Map} from 'immutable';

const resourceReducer = handleActions({
  [FETCH_RESOURCE_REQUEST]:{
    next(state,action){
      console.log(state,action, ' next fro su');
      return state;
    },
    throw(state,action){}
  },
  [FETCHING_RESOURCE]: (state, action) => {
    return state;
  }
}, {resources:Map({})});

export default resourceReducer;
