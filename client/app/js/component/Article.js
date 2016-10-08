import React from 'react'
import Nav from './Nav.js'

export default React.createClass({
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <small>{this.props.date}</small>
        <small>{this.props.tag}</small>
        <p>{this.props.content}</p>
      </div>
      )
  }
})