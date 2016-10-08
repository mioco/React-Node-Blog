import React from 'react'
import Nav from './Nav.js'

export default React.createClass({
  render() {
    return (
      <div className="header container">
        <div className="header-title">
          <Nav to="/"><h3>オショノ野望.</h3></Nav>
        </div>
        <div className="header-nav">
          <ul>
            <li><h4><Nav to="/about">ABOUT.</Nav></h4></li>
            <li><h4><Nav to="/posts">POSTS.</Nav></h4></li>
          </ul>
        </div>
        <div className="header-post pull-right">
          <ul>
            <li><h5><Nav to="/editor">添加文章</Nav></h5></li>
          </ul>
        </div>
        {this.props.children}
      </div>
    )
  }
})