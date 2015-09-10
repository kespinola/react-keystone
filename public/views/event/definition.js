import { Map } from 'immutable';
import yup from 'yup';

const Definition = Map({
  name:'events',
  keys: Map({
    singular:'event',
    plural:'events',
  }),
  loading: false,
  schema: yup.object({
    title: yup.string().required('Title is required.'),
    date: yup.date().default(new Date()),
    description: yup.string().default('').required('Description is required.'),
  }),
  populate:Map({
    host:'users',
    topics:'topics',
  })
});

export default Definition;
