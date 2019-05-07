import React from 'react';
import {Form, Button, Link, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import {NavigationBar} from '../App/navigationbar';
import {Jumbotron} from '../App/Jumbotron';
import {Layout} from '../App/layout';
import {SignUp} from '../SignUp/signup';
import { ToastContainer } from "react-toastr";
import {Container} from 'react-bootstrap';
import {
  getFromStorage,
  setInStorage,
  removeFromStorage
} from '../../utils/storage';
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
        this.props.history.push({
          pathname: '/',
          state: json // your data array of objects
        });
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
        <NavigationBar isLoggedIn={false} userName={""}/>
        <Jumbotron/>
        <Layout>
        <Container>
        <Row>
        <Col md={{ span: 6, offset: 3 }}>
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
          </Col>
          </Row>
          </Container>
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
