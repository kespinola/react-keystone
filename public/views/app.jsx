var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Layout = require('./_layout/base');
var {LeftNav} = require('material-ui');
var withAltContext = require('alt/utils/withAltContext');
var flux = require('../flux');

var App = React.createClass({
	getDefaultProps(){
		return {
			nav: [
				{route:'home', text: 'Home'},
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
            console.log(route,text);
						return <li key={route}><Link to={route}>{text}</Link></li>
					})}
				</ul>
				<RouteHandler {... this.props}/>
			</Layout>
		)
	},
	
	componentDidMount(){
		console.log(this.context);
	},
});

module.exports = withAltContext(flux)(App);
