import React from 'react';
import {RouteHandler, State} from 'react-router';
import { connect } from 'react-redux';
import {
  findResource,
  createResource, 
  destroyResource, 
  updateResource,
  patchResource,
  } from '../../actions/resource';

import {
  populatedResourceSelectorFactory,
  } from '../../selectors/resource';

import def from './definition';

const populatedResourceSelector = populatedResourceSelectorFactory(def);  

function mapDispatchToProps(dispatch){
  return {
    find: payload => dispatch(findResource(payload)),
    create: payload => dispatch(createResource(payload)),
    destroy: payload => dispatch(destroyResource(payload)),
    patch: payload => dispatch(patchResource(payload)),
  }
}

const Index = React.createClass({
  
  mixins:[State],
  
  render(){
    const{
      collection,
      } = this.props;
    const _id = this.getParams()._id;
    return <RouteHandler {... this.props} _id={_id} doc={_id ? collection.get(_id) : null}/>
  },
  
  componentDidMount(){
    const {
      def,
      } = this.props;
    this.props.find({def, query:{}});
  }
  
});

export default connect(
  populatedResourceSelector,
  mapDispatchToProps
)(Index);

