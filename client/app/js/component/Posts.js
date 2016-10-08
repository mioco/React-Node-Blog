import React from 'react'
import List from './List'
import Jumbotron from './Jumbotron'

export default React.createClass({
  render() {
    return (
      <div>
        <Jumbotron />
        <List />
        {this.props.children}
      </div>
      )
  }
})