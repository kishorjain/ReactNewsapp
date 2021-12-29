
import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Switch
  
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const API_KEY = process.env.REACT_APP_API_KEY;
export default class App extends Component {
  state = {
    progress : 0
  }
  setProgress = (progress)=>{
    this.setState({progress : progress});
  }
  render() {
    return (
      <div>
        <Router>
        <NavBar />
        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
          
        />

        <Switch>
          <Route exact  path="/" key="science"><News setProgress={this.setProgress} size={6} api_key={API_KEY} country="in" category="science"/></Route>
          <Route exact path="/general" key="general"><News setProgress={this.setProgress} api_key={API_KEY} size={6} country="in" category="general"/></Route>
          <Route exact path="/health" key="health"><News setProgress={this.setProgress} api_key={API_KEY} size={6} country="in" category="health"/></Route>
          <Route exact path="/sports" key="sports"><News setProgress={this.setProgress} api_key={API_KEY} size={6} country="in" category="sports"/></Route>
        </Switch>
        </Router>
      </div>
    )
  }
}
