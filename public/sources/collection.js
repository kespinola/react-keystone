var axios = require('axios');
var {API_BASE} = require('../constants.json');
var CollectionActions = require('../actions/collection');

const CollectionSource = {
  fetch: {
    remote(state, query = {}, projection = {}) {
      const {
        _id,
        } = query;
      const scope = _id ? `/${_id}` : '';
      //GET '/api/v1/posts(/:_id)'
      return axios.get(`${API_BASE}${state.get('resource')}${scope}`)
    },
    loading: CollectionActions.loading,
    success: CollectionActions.fetchSuccess, // (required)
    error: CollectionActions.error, // (required),
    
  },
  patch: {
    remote(state, _id){
      //PATCH '/api/v1/posts/:_id'
      
      let item = state.get('data').get(_id).map(value => {
        debugger;
        if(value.has('_id')){
          return value.get('_id'); 
        }else if(_.isArray(value.toJS())){
          return value.map( map => {
            return map.get('_id')
          })
        }
      });
      debugger;
      return axios.patch(`${API_BASE}${state.get('resource')}/${_id}`, item.toJS())
    },
    loading: CollectionActions.loading,
    success: CollectionActions.saveSuccess, // (required)
    error: CollectionActions.error, // (required)
  }
};

module.exports = CollectionSource;
