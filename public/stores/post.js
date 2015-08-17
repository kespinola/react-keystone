import CollectionStore from './collection.js';
import alt from '../alt';
import PostActions from '../actions/post';
import TopicStore from './topic';
import UserStore from './user';

console.log(PostActions);

const config = {
  resource:'posts', 
  waitOn:[TopicStore, UserStore],
  actions:[PostActions]
};

export default alt.createStore(CollectionStore, 'PostStore', config);
