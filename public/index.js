'use strict';
var Routes = require('./routes');
var Client = require('react-engine/lib/client');

// boot options
var options = {
	
  routes: Routes,
  viewResolver: function(viewName) {
    return require(`./views/${viewName}`);
  }
};

document.addEventListener('DOMContentLoaded', function onLoad() {
  Client.boot(options);
});
 
