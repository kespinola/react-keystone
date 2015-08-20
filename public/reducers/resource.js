import {FETCH_RESOURCE_REQUEST, FETCH_RESOURCE_SUCCESS, FETCH_RESOURCE_FAILURE} from '../actions/resource';
import {handleActions} from 'redux-actions';

const resourceReducer = handleActions({
  [FETCH_RESOURCE_REQUEST]:(state,action) => {
    
  }
});
