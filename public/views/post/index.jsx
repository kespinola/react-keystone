import React from 'react';
import {RouteHandler, State} from 'react-router';
import { connect } from 'react-redux';
import {
  findResource,
  createResource, 
  destroyResource, 
  updateResource,
  patchResource,
  } from '../../actions/resource.js';

function mapStateToProps(state){
  return{
    data: state.get('collections').get('posts').sort((a,b)=>{ return a.get('createdAt') < b.get('createdAt')}),
  }
}

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
      data,
      } = this.props;
    const slug = this.getParams().slug;
    return <RouteHandler {...this.props} slug={slug} data={slug ? data.get(slug) : data}/>
  },
  
  componentDidMount(){
    this.props.find({resource:'posts', query:{}})
  }
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostIndex);

