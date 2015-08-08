import React from 'react';

var Layout = React.createClass({
  
	render(){
		return(
			<html>
			<head>
				<meta charSet='utf-8' />
				<title>{this.props.title}</title>
				<link rel='stylesheet' type='text/css' href='/build/main.css'></link>
			</head>
			<body className='sidebar-layout'>
			{this.props.children}
      </body>
			<script src='/build/bundle.js'></script>
			</html>
		)
	}
});

export default Layout;
