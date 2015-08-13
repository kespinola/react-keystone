import CollectionStore from './collection.js';
import alt from '../alt';

const config = {
  resource:'topics'
};

export default alt.createStore(CollectionStore, 'TopicStore', config);
