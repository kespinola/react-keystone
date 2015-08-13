import CollectionStore from './collection.js';
import alt from '../alt';
import TopicStore from './topic';

const options = {
  resource:'posts', 
  waitOn:[TopicStore]
};

export default alt.createStore(CollectionStore, 'Post', options);
