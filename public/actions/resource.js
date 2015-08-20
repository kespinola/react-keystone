import {createAction} from 'redux-actions';

export const FETCH_RESOURCE_REQUEST = 'FETCH_RESOURCE_REQUEST';
export const FETCH_RESOURCE_SUCCESS = 'FETCH_RESOURCE_SUCCESS';
export const FETCH_RESOURCE_FAILURE = 'FETCH_RESOURCE_FAILURE';

export const fetchRequest = createAction(FETCH_RESOURCE_REQUEST);
export const fetchSuccess = createAction(FETCH_RESOURCE_SUCCESS);
export const fetchFailure = createAction(FETCH_RESOURCE_FAILURE);
