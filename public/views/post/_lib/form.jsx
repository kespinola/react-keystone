import React, { createClass } from 'react';
import WYSIWYG from '../../_lib/wysiwyg';
import Datepicker from '../../_lib/datepicker';
import Form from 'react-formal';
import Field from '../../_lib/field.jsx';
import { 
  DropdownList,
  Multiselect } from 'react-widgets';
import { Navigation } from 'react-router';

const PostForm = createClass({
  
  getInitialState(){  
    return {
      doc:this.props.doc ? this.props.doc.toJS() : null,
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
      users,
      topics,
      onSubmit,
      submitLabel,
      } = this.props;
    const schema = def.get('schema');
    
    if(!doc) return null;
    
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
        <Field name='title'/>
        <Field name='user' type={DropdownList} data={users.toArray().map( map => map.toJS())} textField='email' valueField='_id' />
        <Field name='state' type={DropdownList} data={['draft','published','archived']} />
        <Field name='publishedDate' type={Datepicker}/>
        <Field name='text' type={WYSIWYG}/>
        <Field name='topics'  type={Multiselect} data={topics.toArray().map( map => map .toJS() )} textField='name' valueField='_id'/>
        <Form.Button type='submit' className='submit'>{submitLabel}</Form.Button>
      </Form>
    )
  },
  
});

export default PostForm;

