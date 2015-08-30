import immutableCreateSelector from './immutable';
import _ from 'lodash';
import { fromJS } from 'immutable';

function join(value, collection){
  
  if(_.isString(value)){
    value = collection.get(value);
  }else{
    value = value.toArray().map( id => {
      return collection.get(id);
    });
  }
  
  return fromJS(value);
}

const collectionSelector = state => state.get('collections');

const metaSelector = state => state.get('resources');

const metaSelectorFactory = resource => {
  return immutableCreateSelector(
    metaSelector,
    meta => meta.get(resource)
  )  
};

const collectionSelectorFactory = resource => {
  return immutableCreateSelector(
    collectionSelector,
      collections => collections.get(resource)
  );
};

const resourceSelectorFactory = resource => {
  return immutableCreateSelector(
    [collectionSelectorFactory(resource), metaSelectorFactory(resource)],
    (collection, meta) => { return {collection, meta} }
  );
};

export const populatedResourceSelectorFactory = def => {
  
  const resource = def.get('keys').get('plural');
  const populate = def.has('populate') ? def.get('populate').toArray().map( dependency => resourceSelectorFactory(dependency) ) : [];
  
  return immutableCreateSelector(
    [resourceSelectorFactory(resource), ... populate],
    (resource, p0, p1, p2, p3, p4) => {
      
      const keys = resource.meta.get('populate').keySeq().toArray();
      
      const lookup = [p0, p1, p2, p3, p4].filter( obj => obj );
      
      const collection = resource.collection.map( doc => {
        
        lookup.forEach( (populate, i) => {
          const key = keys[i];
          if(!doc.has(key)) return false;
          doc = doc.set(key, join(doc.get(key), populate.collection));
        });
        
        return doc;
        
      });
      
      return _.assign(resource, { collection });
      
    });
}

