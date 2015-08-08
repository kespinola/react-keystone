import React from 'react';
import {Link, RouteHandler, Navigation} from 'react-router';
import Layout from './_layout/base';
import injectTapEventPlugin from 'react-tap-event-plugin';
import mui, {LeftNav} from 'material-ui';
import Container from 'react-container';

let ThemeManager = new mui.Styles.ThemeManager();

injectTapEventPlugin();

const App = React.createClass({
  
  mixins:[Navigation],
  
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  
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
        <LeftNav ref="nav" menuItems={nav} onChange={this._onMenuItemClick} />
        <Container fill={true} grow={true} align='center'>
          <RouteHandler {... this.props}/>
        </Container>
			</Layout>
		)
	},
  
  componentWillMount(){
    ThemeManager.setTheme(ThemeManager.types.DARK);
  },
  
  _onMenuItemClick(e,index,item){
    this.transitionTo(item.route);
  },
  
});

export default App;
