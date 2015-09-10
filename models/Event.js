var keystone = require('keystone'),
  Types = keystone.Field.Types;

var Event = new keystone.List('Event', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  track:true,
});

Event.add({
  title: { type: String, required: true },
  date: { type: Types.Date, index: true },
  host: { type: Types.Relationship, ref: 'User', index: true },
  createdAt: { type: Types.Date, default: Date.now, noedit: true, index: true },
  description: { type: Types.Html, wysiwyg: true, height: 400},
  images:{type: Types.CloudinaryImages},
  topics: { type: Types.Relationship, ref: 'Topic', many: true },
  slug: { type: String, index: true },
});

/**
 Relationships
 =============
 */

Event.relationship({ path: 'comments', ref: 'Comment', refPath: 'comment' });

Event.track = true;
Event.defaultColumns = 'title, host|20%, date|20%';
Event.register();

