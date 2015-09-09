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

const defSelector = state => state.get('resources');

const defSelectorFactory = resource => {
  return immutableCreateSelector(
    defSelector,
    def => def.get(resource)
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
    [collectionSelectorFactory(resource), defSelectorFactory(resource)],
    (collection, def) => { return {collection, def} }
  );
};

export const populatedResourceSelectorFactory = def => {
  
  const populate = def.has('populate') ? def.get('populate').toArray().map( dependency => resourceSelectorFactory(dependency) ) : [];
  
  return immutableCreateSelector(
    [resourceSelectorFactory(def.get('name')), ... populate],
    (resource, p0, p1, p2, p3, p4) => {
      
      const keys = resource.def.get('populate').keySeq().toArray();
      
      const lookup = [p0, p1, p2, p3, p4].filter( obj => obj );
      
      lookup.forEach( (populate, i) => {
        const {
          def,
          collection,
          } = populate;
        const key = def.get('name');
        _.assign(resource, {[key]:collection});
      });
      

      let collection = resource.collection.map( doc => {

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

