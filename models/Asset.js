var keystone = require('keystone'),
  Types = keystone.Field.Types;

var Asset = new keystone.List('Asset',{
  map: { name: 'label' },
  autokey: { path: 'slug', from: 'label', unique: true },
});

Asset.add({
  label:{type: String, required:true},
  file:{
    type: Types.S3File,
    s3path:'images',
    filename: function(item, filename){
      return item._id + '-' + filename
    },
    format: function(item, file){
      return '<img src="'+file.url+'" style="max-width: 300px">'
    }
  },
});

Asset.defaultColumns = 'name';
Asset.register();

