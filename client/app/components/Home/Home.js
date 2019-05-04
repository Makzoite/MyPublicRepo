import React, { Component } from 'react';
import 'whatwg-fetch';
import Login from '../Login/login';
import SignUp from '../SignUp/signup';
import {
  getFromStorage,
  setInStorage,
  removeFromStorage
} from '../../utils/storage';
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token:'',
    };
    this.LoginClickHandler = this.LoginClickHandler.bind(this);
    this.SignUpClickHandler = this.SignUpClickHandler.bind(this);
    this.onLogoutClickHandler = this.onLogoutClickHandler.bind(this);
  }
  LoginClickHandler(dataFromLogin){
    this.setState({
      token: dataFromLogin.token,
    });
    setInStorage('main_app_key',dataFromLogin);
  }
  SignUpClickHandler(dataFromSignUp){

  }

  onLogoutClickHandler(){
    const obj = getFromStorage('main_app_key')
    if(obj){
      //verify thte token
      const {token} = obj;
      fetch('/api/account/logout?token='+ token)
        .then(res => res.json())
        .then(json => {
          if(json.success){
            this.setState({
              token:'',
              isLoading: false
            });
            removeFromStorage('main_app_key');
          }
          else{
            this.setState({
              isLoading: false
            });
          }
        });
    }
    else{
      //No token
      this.setState({
        isLoading: false
      });
    }
  }
  componentDidMount() {
    const obj = getFromStorage('main_app_key')
    if(obj){
      //verify thte token
      const {token} = obj;
      fetch('/api/account/verify?token='+ token)
        .then(res => res.json())
        .then(json => {
          if(json.success){
            this.setState({
              token,
              isLoading: false
            });
            setInStorage('main_app_key',dataFromLogin);
          }
          else{
            this.setState({
              isLoading: false
            });
          }
        });
    }
    else{
      //No token
      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    const {
      isLoading,
      token
    } = this.state;
    if(isLoading){
      return(<p>Loading...</p>);
    }
    if(!token){
      return(
        <div>
          <Login loginClickCallback={this.LoginClickHandler} />
          <SignUp signUpClickCallback = {this.SignUpClickHandler}/>
        </div>);
    }
    return (
      <div>
        <p>Account</p>
        <button onClick={this.onLogoutClickHandler}>Log out</button>
      </div>
    );
  }
}

export default Home;
