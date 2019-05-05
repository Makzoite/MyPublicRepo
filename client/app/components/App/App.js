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
import {Layout} from './layout';
import About from '../About/about';
import Login from '../Login/login';
import SignUp from '../SignUp/signup';

import {NavigationBar} from './navigationbar';
import {Jumbotron} from './Jumbotron';
import '../../styles/styles.scss';

class App extends Component {
render(){
  return (
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/welcome" component={Login}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/about" component={About}/>
            <Route component={NotFound}/>
          </Switch>
        </Router>
    );
  }
}

export default App;
