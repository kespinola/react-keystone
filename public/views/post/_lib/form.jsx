import React from 'react';
import WYSIWYG from '../_lib/wysiwyg';
import Datepicker from '../_lib/datepicker';
import Form from 'react-formal';
import { DropdownList } from 'react-widgets';
import { Navigation } from 'react-router';

const PostForm = React.createClass({
  
  getInitialState(){  
    return {
      doc:this.props.doc ? this.props.doc.toJS() : {},
    }
  },

  componentWillReceiveProps(props){
    props.doc && this.setState({doc:props.doc.toJS()});
  },

  render(){
    const {
      doc,
      } = this.state;
    const{
      def,
      onSubmit,
      } = this.props;
    const schema = def.get('schema');
    return (
      <Form
        noValidate
        className='basic'
        schema={schema}
        defautValue={schema.default()}
        value={doc}
        onChange={doc => this.setState({doc})}
        onSubmit={onSubmit}
        >
        <Form.Summary />
        <Form.Field name='title'/>
        <Form.Field name='state' type={DropdownList} data={['draft','published','archived']} />
        <Form.Field name='publishedDate' type={Datepicker}/>
        <Form.Field name='text' type={WYSIWYG}/>
        <Form.Button type='submit' className='submit'>Create Post</Form.Button>
      </Form>
    )
  },
  
});

export default PostForm;

