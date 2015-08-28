import { createSelectorCreator } from 'reselect';
import Immutable from 'immutable';

const immutableCreateSelector = createSelectorCreator(Immutable.is);

const getState = state => state;
const userSelector = state => state.get('collections').get('users');
const topicSelector = state=> state.get('collections').get('topics');

const postSelector = immutableCreateSelector(
  [ userSelector, topicSelector],
  (users, topics) => {
    debugger;
    return {};
  }); 

export default postSelector;
