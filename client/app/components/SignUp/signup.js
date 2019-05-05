import React from 'react';
import {Form, Button} from 'react-bootstrap';

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpFirstName:'',
      signUpLastName:'',
      signUpEmail: '',
      signUpPassword:'',
      signUpError:'',
    };

    this.OnTextBoxChangedSignUpFirstName = this.OnTextBoxChangedSignUpFirstName.bind(this);
    this.OnTextBoxChangedSignUpLastName = this.OnTextBoxChangedSignUpLastName.bind(this);
    this.OnTextBoxChangedSignUpEmail = this.OnTextBoxChangedSignUpEmail.bind(this);
    this.OnTextBoxChangedSignUpPassword = this.OnTextBoxChangedSignUpPassword.bind(this);

    this.OnSignUp = this.OnSignUp.bind(this);
    this.OnLogin = this.OnLogin.bind(this);
  }
  OnTextBoxChangedSignUpFirstName(event){
    this.setState({
      signUpFirstName: event.target.value,
    });
  }
  OnTextBoxChangedSignUpLastName(event){
    this.setState({
      signUpLastName: event.target.value,
    });
  }
  OnTextBoxChangedSignUpEmail(event){
    this.setState({
      signUpEmail: event.target.value,
    });
  }
  OnTextBoxChangedSignUpPassword(event){
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  OnSignUp(event){
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpError,
    } = this.state;

    fetch('/api/account/signup',{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        firstName:signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword
      }),
    }).then(res => res.json())
    .then(json => {
      if(json.success){
        this.props.onLoginClick(signUpEmail);
        this.setState({
          signInError: json.message,
          signUpFirstName:'',
          signUpLastName:'',
          signUpEmail: '',
          signUpPassword:'',
        });
      }
      else{
        this.setState({
          signInError: json.message,
        });
      }
    });
    }
  OnLogin(event){
    this.props.onLoginClick();
  }
  render() {
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpError,
    } = this.state;
    return (
      <div>
        <h1>User Sign Up</h1>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" value={signUpFirstName} onChange = {this.OnTextBoxChangedSignUpFirstName}/>
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter last name" value={signUpLastName} onChange = {this.OnTextBoxChangedSignUpLastName}/>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={signUpEmail} onChange = {this.OnTextBoxChangedSignUpEmail}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={signUpPassword} onChange = {this.OnTextBoxChangedSignUpPassword}/>
        </Form.Group>
        <Button variant="primary" onClick={this.OnSignUp}>
          Sign Up
        </Button>

        <Form.Group controlId="formBasicSignUp">
          <Form.Label >Already have an account?</Form.Label>
          <Button variant="link" onClick={this.OnLogin}>
            Login
          </Button>
        </Form.Group>
      </div>
    )
  }
}

export default SignUp;
