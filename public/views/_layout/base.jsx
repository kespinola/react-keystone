import React from 'react';

var Layout = React.createClass({
  
	render(){
		return(
			<html>
        <head>
          <meta charSet='utf-8' />
          <title>{this.props.title}</title>
          <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet" />
          <link rel='stylesheet' type='text/css' href='/build/main.css' />
        </head>
        <body>
          {this.props.children}
        </body>
        <script src='/build/bundle.js'></script>
			</html>
		)
	}
});

export default Layout;
