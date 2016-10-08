import React from 'react'
import Avatar from '../../image/avatar.jpg'
export default React.createClass({
  render:function(){
    return(
      <div className="info-side">
        <div className="info-avatar"><img src={Avatar} alt=""/></div>
        <div className="info-detail">
          <hr />
          <h1>OSYO</h1>
          <small>我只是个兴趣使然的路人罢了。</small><br/>
          <small>不知道说什么好</small>
          <p>
            <i>○</i>&nbsp;
            <span><a href="">THIS BLOG IN GITHUB</a></span>
          </p>
          <hr />
        </div>
      </div>
      )
  }
})