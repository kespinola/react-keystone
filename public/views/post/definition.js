import { Map } from 'immutable';
import yup from 'yup';

const PostDefinition = Map({
  keys: Map({
    singular:'post',
    plural:'posts',
  }),
  primaryKey: 'slug',
  sortBy:(a, b) => { return a.get('createdAt') > b.get('createdAt') },
  loading: false,
  schema: yup.object({
    title: yup.string().required('Title is required.'),
    state: yup.string().default('draft').matches(/(draft|published|archived)/),
    publishedDate: yup.date(),
    text: yup.string().required('Text is required.'),
  }),
  populate:Map({
    topics:'topics',
    user:'users',
  })
});

export default PostDefinition;
