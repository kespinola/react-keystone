import immutableCreateSelector from './immutable';

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

export const resourceSelectorFactory = resource => {
  return immutableCreateSelector(
    [collectionSelectorFactory(resource), metaSelectorFactory(resource)],
    (collection, meta) => {return {collection, meta}}
  );
};

