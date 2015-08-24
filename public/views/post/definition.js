import { Map } from 'immutable';
import yup from 'yup';

const PostDefinition = Map({
  primaryKey: 'slug',
  loading: false,
  schema: yup.object({
    title: yup.string().required('Title is required.'),
    state: yup.string().default('draft').matches(/(draft|published|archived)/),
    publishedDate: yup.date(),
    text: yup.string().required('Text is required.'),
  }),
  waitOn:['topics','users']
});

export default PostDefinition;
