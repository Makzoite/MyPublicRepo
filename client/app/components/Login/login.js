import React from 'react';
import {Form, Button, Link} from 'react-bootstrap';
import styled from 'styled-components';
import {NavigationBar} from '../App/navigationbar';
import {Jumbotron} from '../App/Jumbotron';
import {Layout} from '../App/layout';
import {SignUp} from '../SignUp/signup';
import {
  getFromStorage,
  setInStorage,
  removeFromStorage
} from '../../utils/storage';
const Styles = styled.div`
.labelCustom{
`;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword:'',
      signInError:'',
      isSignUp:false,
    };

    this.OnTextBoxChangedSignInEmail = this.OnTextBoxChangedSignInEmail.bind(this);
    this.OnTextBoxChangedSignInPassword = this.OnTextBoxChangedSignInPassword.bind(this);
    this.OnLogin = this.OnLogin.bind(this);
    this.OnUserSignUpPage = this.OnUserSignUpPage.bind(this);
    this.SignUpClickHandler = this.SignUpClickHandler.bind(this);
    this.OnLoginClcikorSignUpPageHandler = this.OnLoginClcikorSignUpPageHandler.bind(this);
  }
  componentDidMount(){

  }
  OnTextBoxChangedSignInEmail(event){
    this.setState({
      signInEmail:event.target.value,
    });
  }
  OnTextBoxChangedSignInPassword(event){
    this.setState({
      signInPassword:event.target.value,
    });
  }
  OnLogin(event){
    const {
      signInEmail,
      signInPassword,
      signInError,
    } = this.state;

    fetch('/api/account/signin',{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      }),
    }).then(res => res.json())
    .then(json => {
      alert(json.message);
      if(json.success){
        this.setState({
          signInError: json.message,
          signInEmail: '',
          signInPassword:'',
        });
        setInStorage('main_app_key',json);
        this.props.history.push("/");
      }
      else{
        this.setState({
          signInError: json.message,
        });
      }
    });
  }
  OnUserSignUpPage(event){
    this.setState({
      isSignUp: true,
    });
  }
  SignUpClickHandler(signUpEmaildata){
    this.setState({
      isSignUp: false,
      signInEmail:signUpEmaildata
    });
  }
  OnLoginClcikorSignUpPageHandler(loginClickData){
    this.setState({
      isSignUp: false
    });
  }
  render() {
    const {
      signInEmail,
      signInPassword,
      signInError,
      isSignUp,
    } = this.state;
    if(!isSignUp)
    {
      return (
        <React.Fragment>
        <NavigationBar/>
        <Jumbotron/>
        <Layout>
        <div>
          <Form>
            <h1>User Login</h1>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={signInEmail} onChange = {this.OnTextBoxChangedSignInEmail}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={signInPassword} onChange = {this.OnTextBoxChangedSignInPassword}/>
            </Form.Group>
            <Button variant="primary" onClick={this.OnLogin}>
              Login
            </Button>
            <Form.Group controlId="formBasicSignUp">
              <Form.Label >Don't have an account?</Form.Label>
              <Button variant="link" onClick={this.OnUserSignUpPage}>
                Sign Up
              </Button>
            </Form.Group>
          </Form>
        </div>
        </Layout>
        </React.Fragment>
      );
    }
    else{
      return(
        <React.Fragment>
        <NavigationBar/>
        <Layout>
        <div>
        <SignUp signUpClickCallback = {this.SignUpClickHandler} onLoginClick={this.OnLoginClcikorSignUpPageHandler}/>
        </div>
        </Layout>
        </React.Fragment>
      );
    }
  }
}

export default Login;
// <input
//   type="email"
//   placeholder="Email"
//   value = {signInEmail}
//   onChange = {this.OnTextBoxChangedSignInEmail}
// />
// <br/>
// <input
//   type="password"
//   placeholder="Password"
//   value={signInPassword}
//   onChange = {this.OnTextBoxChangedSignInPassword}
// />
// <br/>
// button onClick={this.OnLogin}>Login</button>
