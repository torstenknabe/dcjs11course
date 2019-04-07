import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch } from 'react-router-dom'
import Home from './pages/home.js'
import Result from './pages/result.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/:searchText" component={Result}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;