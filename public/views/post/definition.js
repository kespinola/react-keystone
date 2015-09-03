import { Map } from 'immutable';
import yup from 'yup';

const PostDefinition = Map({
  name:'posts',
  keys: Map({
    singular:'post',
    plural:'posts',
  }),
  sortBy:(a, b) => { return a.get('createdAt') < b.get('createdAt') },
  loading: false,
  schema: yup.object({
    title: yup.string().required('Title is required.'),
    state: yup.string().default('draft').matches(/(draft|published|archived)/),
    publishedDate: yup.date().default(new Date()),
    text: yup.string().default('').required('Text is required.'),
  }),
  populate:Map({
    topics:'topics',
    user:'users',
  })
});

export default PostDefinition;
