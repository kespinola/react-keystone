'use strict';

var Routes = require('./routes');
var Client = require('react-engine/lib/client');
var _s = require('underscore.string');

// boot options
var options = {
	
  routes: Routes,
  viewResolver: function(viewName) {
		console.log(`./views/${viewName}`);
    return require(`./views/${viewName}`);
  }
};

document.addEventListener('DOMContentLoaded', function onLoad() {
  Client.boot(options);
});
 
