var keystone = require('keystone'),
  	Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
	track:true,
});

Post.add({
  title: { type: String, required: true },
  createdAt: { type: Types.Date, default: Date.now, noedit: true, index: true },
  slug: { type: String, index: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  user: { type: Types.Relationship, ref: 'User', index: true },
  publishedDate: { type: Types.Date, index: true },
  images:{type: Types.CloudinaryImages},
  text: { type: Types.Html, wysiwyg: true, height: 400},
  topics: { type: Types.Relationship, ref: 'Topic', many: true },
});

/**
 Relationships
 =============
 */

Post.relationship({ path: 'comments', ref: 'Comment', refPath: 'comment' });

Post.track = true;
Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();

