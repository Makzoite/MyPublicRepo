import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import NotFound from './NotFound';
import Home from '../Home/Home';
import Contact from '../Contact/contact';
import {Layout} from '../Layout/layout';
import About from '../About/about';
import {NavigationBar} from '../NavigationBar/navigationbar';
import '../../styles/styles.scss';

class App extends Component {
render(){
  return (
  <React.Fragment>
  <NavigationBar/>
    <Layout>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/about" component={About}/>
            <Route component={NotFound}/>
          </Switch>
        </Router>
      </Layout>
    </React.Fragment>
    );
  }
}

export default App;
