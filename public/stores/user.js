import CollectionStore from './collection.js';
import alt from '../alt';

const config = {
  resource:'users'
};

export default alt.createStore(CollectionStore, 'UserStore', config);
