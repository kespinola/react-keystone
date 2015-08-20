import React from 'react';
import {RouteHandler, State} from 'react-router';
import { connect } from 'react-redux';
import { fetchRequest } from '../../actions/resource.js';

function mapStateToProps(state = {}){
  console.log(state, ' mapping state to props');
  return{state}
}

function mapDispatchToProps(dispatch){
  return {
    fetch: (payload) => dispatch(fetchRequest(payload)),
  }
}

const PostIndex = React.createClass({
  
  mixins:[State],
  
  render(){
    const slug = this.getParams().slug;
    return <RouteHandler slug={slug}/>
  },
  componentDidMount(){
    this.props.fetch({resource:'posts', query:{}});
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostIndex);

