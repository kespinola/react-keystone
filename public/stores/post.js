import CollectionStore from './collection.js';
import alt from '../alt';
import TopicStore from './topic';
import UserStore from './user';

const config = {
  resource:'posts', 
  waitOn:[TopicStore, UserStore]
};

export default alt.createStore(CollectionStore, 'PostStore', config);
