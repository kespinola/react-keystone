var keystone = require('keystone'),
  	Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
	track:true,
});

Post.add({
  title: { type: String, required: true },
  slug: { type: String, index: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  author: { type: Types.Relationship, ref: 'User', index: true },
  publishedDate: { type: Types.Date, index: true },
  text: { type: Types.Html, wysiwyg: true, height: 400},
  assets: { type: Types.Relationship, ref: 'Asset', index: true, many:true, },
  topics: { type: Types.Relationship, ref: 'topics', many: true },
});

/**
 Relationships
 =============
 */

Post.relationship({ path: 'comments', ref: 'Comment', refPath: 'comment' });
Post.relationship({ path: 'assets', ref: 'Asset', refPath: 'asset' });

Post.track = true;
Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();

