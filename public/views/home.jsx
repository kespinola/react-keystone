import React from 'react';
import Container from 'react-container';

const Home = React.createClass({
  contextTypes:{
    flux:React.PropTypes.object,
  },
	render(){
		return (
			<h1>Hello World From Home</h1>
		)
	},
});

export default Home;
