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

const postResourceSelector = populatedResourceSelectorFactory(def);  

function mapDispatchToProps(dispatch){
  return {
    find: payload => dispatch(findResource(payload)),
    create: payload => dispatch(createResource(payload)),
    destroy: payload => dispatch(destroyResource(payload)),
    patch: payload => dispatch(patchResource(payload)),
  }
}

const PostIndex = React.createClass({
  
  mixins:[State],
  
  render(){
    const{
      collection,
      } = this.props;
    const slug = this.getParams().slug;
    return <RouteHandler {...this.props} slug={slug} doc={slug ? collection.get(slug) : null}/>
  },
  
  componentDidMount(){
    this.props.find({resource:'posts', query:{}})
  }
  
});

export default connect(
  postResourceSelector,
  mapDispatchToProps
)(PostIndex);

