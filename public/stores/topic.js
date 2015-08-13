import CollectionStore from './collection.js';
import alt from '../alt';

const options = {
  resource:'topics'
};

export default alt.createStore(CollectionStore, 'Topic', options);
