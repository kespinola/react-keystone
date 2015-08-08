import _ from 'lodash';
import immutable from 'alt/utils/ImmutableUtil';
import Immutable from 'immutable';
import CollectionSource from '../sources/collection';
import CollectionActions from '../actions/collection';

class RestStore {
	
	constructor(model){
    
    this.state = Immutable.Map({
      model,
      data: Immutable.Map({}),
    });
    
    this.bindActions(CollectionActions);
    this.registerAsync(CollectionSource);
	}
  
	onFindSuccess(payload){
    
    let data = _.reduce(payload.data[this.state.get('model')],(memo, obj)=>{
      memo[obj._id] = obj;
      return memo;
    },{});
    data = Immutable.fromJS(data);
    this.setState(this.state.set('data', data.merge(this.state.get('data'))));
	}
  
  onError(payload){
    console.log(payload);
  }
	
}

export default immutable(RestStore);
