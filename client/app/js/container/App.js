import React,{ Component, PropTypes } from 'react';
import Header from '../component/Header';
import "../../less/style.less";
import Fetch from '../fetch.js';

class Blog extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props
  }
}
export default React.createClass({
  getInitialState:function(){
    var articles = [
      {
        key:1,
        title:'TEST TITLE 1',
        tag:['TAG1','TAG2'],
        content: '这里有个内容1'
      },
      {
        key:2,
        title:'TEST TITLE 2',
        tag:['TAG1'],
        content: '这里有个内容2'
      },
    ];
    return{
      articles: articles
    }
  },
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
      )
  }
})