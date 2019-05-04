import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword:'',
      signInError:'',
    };

    this.OnTextBoxChangedSignInEmail = this.OnTextBoxChangedSignInEmail.bind(this);
    this.OnTextBoxChangedSignInPassword = this.OnTextBoxChangedSignInPassword.bind(this);
    this.OnLogin = this.OnLogin.bind(this);
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
      if(json.success){
        this.setState({
          signInError: json.message,
          signInEmail: '',
          signInPassword:'',
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
      signInEmail,
      signInPassword,
      signInError,
    } = this.state;
    return (
      <div>
        <p>User Login</p>
        <input
          type="email"
          placeholder="Email"
          value = {signInEmail}
          onChange = {this.OnTextBoxChangedSignInEmail}
        />
        <br/>
        <input
          type="password"
          placeholder="Password"
          value={signInPassword}
          onChange = {this.OnTextBoxChangedSignInPassword}
        />
        <br/>
        <button onClick={this.OnLogin}>Login</button>
      </div>
    );
  }
}

export default Login;
