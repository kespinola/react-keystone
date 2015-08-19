var keystone = require('keystone');
var _ = require('lodash');

var restful = require("restful-keystone")(keystone, {
	root: process.env.API_BASE || "/api/"
});

function formatDeleteResponse(res, req, next){
  console.log("deleted:", res.locals.body);
  res.send(res.locals.status, res.locals.body);
  next();
}

var models = Object.keys(keystone.mongoose.models);

module.exports = function(){
	
	return restful.expose(_.reduce(models, (memo,model,i) => {
		memo[model] = true;
		return memo;
	},{}))
    .after('delete',_.reduce(models, (memo,model,i) => {
      memo[model] = formatDeleteResponse;
      return memo;
    },{}))
    .start();
	
}();
