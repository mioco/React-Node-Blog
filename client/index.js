import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './app/js/container/App'
import About from './app/js/component/About'
import Posts from './app/js/component/Posts'
import Home from './app/js/component/Home'
import Editor from './app/js/component/Editor'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/posts" component={Posts}/>
      <Route path="/about" component={About}/>
      <Route path="/editor" component={Editor}/>
    </Route>
  </Router>
), document.getElementById('app'))