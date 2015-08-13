// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var path = require('path');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'react-keystone',
	'brand': 'Web App Starter',
	'favicon': 'public/favicon.ico',
	'emails': 'templates/emails',
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': 'cThE1sTk)W8uX:?e#gb?1"Sevb`0MT/.>V;nM:DR/`.>xxga=SaaB*D/aeZW0By7'

});

//Configure s3

if(process.env.S3_BUCKET.length){
  keystone.set('s3 config',{
    bucket:process.env.S3_BUCKET,
    key:process.env.S3_KEY,
    secret:process.env.S3_SECRET
  })
}
//Configure Cloudinary


if(process.env.CLOUDINARY_CLOUD.length){
  keystone.set('cloudinary config',{
    cloud_name:process.env.CLOUDINARY_CLOUD,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
  })
}

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

keystone.set('email locals', {
	logo_src: '/images/logo-email.gif',
	logo_width: 194,
	logo_height: 76,
	theme: {
		email_bg: '#f9f9f9',
		link_color: '#2697de',
		buttons: {
			color: '#fff',
			background_color: '#2697de',
			border_color: '#1a7cb7'
		}
	}
});

// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.

keystone.set('email rules', [{
	find: '/images/',
	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/images/' : 'http://localhost:3000/images/'
}, {
	find: '/keystone/',
	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/keystone/' : 'http://localhost:3000/keystone/'
}]);

// Load your project's email test routes

keystone.set('email tests', require('./routes/emails'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'users': 'users',
	'posts':'posts',
});

// Start Keystone to connect to your database and initialise the web server

keystone.start({
	onMount: function(){
		var app = keystone.app;
		var express = require('express');
		var renderer = require('react-engine');
		var engine = renderer.server.create({
			reactRoutes: path.join(__dirname,'/public/routes.jsx')
		});

		app.engine('.jsx', engine);
		app.set('views',path.join(__dirname, '/public/views'));
		app.set('view engine','jsx');
		app.set('view', renderer.expressView);
		app.use(express.static('public'));

		app.get('*', function(req,res){
			res.render(req.url);
		});

	}
});
