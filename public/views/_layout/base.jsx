var React = require('react');

var Layout = React.createClass({
	render(){
		return(
			<html>
			<head>
				<meta charSet='utf-8' />
				<title>{this.props.title}</title>
				<link rel='stylesheets' type='text/css' href='/build/main.css'></link>
			</head>
			<body>
			{this.props.children}
			</body>
			<script src='/build/bundle.js'></script>
			</html>
		)
	}
});

module.exports = Layout;
