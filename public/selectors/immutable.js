import Immutable from 'immutable';
import { createSelectorCreator } from 'reselect';

const immutableCreateSelector = createSelectorCreator(Immutable.is);

export default immutableCreateSelector;
