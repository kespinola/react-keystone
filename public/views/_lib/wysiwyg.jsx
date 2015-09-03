import React from 'react';
import EditableDiv from 'react-wysiwyg-editor';

const WSYSIWG = React.createClass({
  
  getInitialState(){
    const{
      value,
      } = this.props;
    return{
      value:value ? value : ''
    }
  },
  
  componentWillReceiveProps(props){
    const {
      value,
      } = props;
    value && this.setState({value})
  },
  
  render(){
    return <EditableDiv className='markup-box' content={this.state.value} onChange={this._handleContentChange} />
  },
  
  _handleContentChange(e){
    this.props.onChange(e.target.value);
  }
  
});

export default WSYSIWG;
