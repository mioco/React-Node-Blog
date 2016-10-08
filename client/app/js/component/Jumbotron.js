import React from 'react'
import Jumbotron from '../../image/jumbotron_1.jpg'

export default React.createClass({
  render() {
    return(
      <div className="jumbotron">
        <img src={Jumbotron} alt=""/>
      </div>
    )
  }
})
