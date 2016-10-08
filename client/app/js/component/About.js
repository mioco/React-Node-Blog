import React from 'react'
import Jumbotron from './Jumbotron'

export default React.createClass({
  render() {
    return (
      <div>
        <Jumbotron />
        <div className="container">
          <h3>关于我</h3>
        </div>
      </div>
      )
  }
})