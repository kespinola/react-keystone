var React = require('react');
var Router, {Link, RouteHandler} = require('react-router');
var Layout = require('./_layout/base');
var {LeftNav} = require('material-ui');

var App = React.createClass({
	getDefaultProps(){
		return {
			nav: [
				{route: 'home', text: 'Home'},
				{route: 'blog', text: 'Blog'}
			]
		}
	},
	render(){
		const {
			nav
			} = this.props;
		return(
			<Layout {... this.props}>
				<ul>
					{nav.map((item)=>{
						const{
							route,
							text,
							} = item;
						return <li key={route}><Link to={route}>{text}</Link></li>
					})}
				</ul>
				<RouteHandler {... this.props}/>
			</Layout>
		)
	}
});

module.exports = App;
