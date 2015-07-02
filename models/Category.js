var keystone = require('keystone'),
  Types = keystone.Field.Types;

var Category = new keystone.List('Category', {
  autokey: { from: 'name', path: 'key' }
});

Category.add({
  name: { type: String, required: true }
});

Category.relationship({ ref: 'Post', path: 'categories' });

Category.track = true;
Category.register();
