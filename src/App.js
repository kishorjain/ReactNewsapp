
import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Switch
  
} from "react-router-dom";


export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <NavBar />
        <Switch>
          <Route exact  path="/" key="science"><News size={6} country="in" category="science"/></Route>
          <Route exact path="/general" key="general"><News size={6} country="in" category="general"/></Route>
          <Route exact path="/health" key="health"><News size={6} country="in" category="health"/></Route>
          <Route exact path="/sports" key="sports"><News size={6} country="in" category="sports"/></Route>
        </Switch>
        </Router>
      </div>
    )
  }
}
