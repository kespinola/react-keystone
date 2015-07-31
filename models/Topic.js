var keystone = require('keystone'),
  Types = keystone.Field.Types;

var Topic = new keystone.List('Topic', {
  autokey: { from: 'name', path: 'key' }
});

Topic.add({
  name: { type: String, required: true }
});

Topic.relationship({ ref: 'Post', path: 'categories' });

Topic.track = true;
Topic.register();
