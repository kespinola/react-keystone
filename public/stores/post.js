import RestStore from './rest';
import alt from '../alt';

class PostStore extends RestStore {
  constructor(){
    super();
    this.model = 'post';
  }
}

export default alt.createStore(PostStore);
