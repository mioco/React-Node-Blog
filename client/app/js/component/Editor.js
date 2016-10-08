import React from 'react'

export default React.createClass({
  render:function() {
    return(
      <div className="container">
        <form action="/post" method="post">
          <input type="text" name="title" id="title" className="form-controler" placeholder="标题"/>
          <input type="text" name="tag[]" className="form-controler" placeholder="tag"/>
          <textarea name="content" id="" cols="30" rows="10" className="form-controler" placeholder="内容"></textarea>
          <div className="pull-right">
          <button type="submit" className="btn">发布</button>
          <button className="btn">取消</button>
          </div>
        </form>
      </div>
    )
  }
})