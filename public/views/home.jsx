import React from 'react';

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
