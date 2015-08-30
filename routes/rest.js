var keystone = require('keystone');
var _ = require('lodash');

var restful = require("restful-keystone")(keystone, {
	root: process.env.API_BASE || "/api/"
});

var models = Object.keys(keystone.mongoose.models);

module.exports = function(){
	
	return restful.expose(_.reduce(models, (memo,model,i) => {
		memo[model] = true;
		return memo;
	},{}))
    .start();
}();
