import {FETCH_RESOURCE_REQUEST, FETCH_RESOURCE_SUCCESS, FETCH_RESOURCE_FAILURE} from '../actions/resource';
import {handleActions} from 'redux-actions';
import {Map} from 'immutable';

const resourceReducer = handleActions({
  [FETCH_RESOURCE_REQUEST]:(state, action) => ({
    resources: Map({})
  })
}, {resources:Map({})});

export default resourceReducer;
