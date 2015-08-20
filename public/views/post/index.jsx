import React from 'react';
import {RouteHandler, State} from 'react-router';
import { connect } from 'react-redux';
import { fetchResource } from '../../actions/resource.js';

function mapStateToProps(state){
  return{
    data: state.get('resources').get('posts'),
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetch: (payload) => dispatch(fetchResource(payload)),
  }
}

const PostIndex = React.createClass({
  
  mixins:[State],
  
  render(){
    const slug = this.getParams().slug;
    return <RouteHandler slug={slug} data={this.props.data.toArray()} />
  },
  componentDidMount(){
    this.props.fetch({resource:'posts', query:{}})
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostIndex);

