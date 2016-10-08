import React from 'react'
import Jumbotron from '../../image/jumbotron.jpg'
import Footer from './Footer'
import Info from './Info'
import List from './List'

export default React.createClass({
  render() {
    return(
      <div>
        <div className="home-page">
          <div className="jumbotron">
            <img src={Jumbotron} alt=""/>
          </div>
          <div className="container">          
            <Info />
          </div>
        </div>
        <List />
        <Footer />
      </div>
    )
  }
})