var keystone = require('keystone');
var _ = require('lodash');

var restful = require("restful-keystone")(keystone, {
	root: "/api/v1"
});

var models = Object.keys(keystone.mongoose.models);

module.exports = function(){
	
	return restful.expose(_.reduce(models,function(res,model,i){
		res[model] = true;
		return res;
	},{})).start();
	
}();
