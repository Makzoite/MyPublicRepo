import React from 'react';

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
        this.setState({
          signInError: json.message,
          signUpFirstName:'',
          signUpLastName:'',
          signUpEmail: '',
          signUpPassword:'',
        });
        this.props.loginClickCallback(json);
      }
      else{
        this.setState({
          signInError: json.message,
        });
      }
    });
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
        <p>User Sign Up</p>
        <input
        type="textbox"
        placeholder="First Name"
        value = {signUpFirstName}
        onChange = {this.OnTextBoxChangedSignUpFirstName}
        />
        <input
        type="textbox"
        placeholder="Last Name"
        value = {signUpLastName}
        onChange = {this.OnTextBoxChangedSignUpLastName}
        />
        <br/>
        <input
        type="email"
        placeholder="Email"
        value = {signUpEmail}
        onChange = {this.OnTextBoxChangedSignUpEmail}
        />
        <br/>
        <input
        type="password"
        placeholder="Password"
        value = {signUpPassword}
        onChange = {this.OnTextBoxChangedSignUpPassword}
        />
        <button onClick={this.OnSignUp}>Sign Up</button>
      </div>
    )
  }
}

export default SignUp;
