import React, { Component } from 'react';
import 'whatwg-fetch';
import Login from '../Login/login';
import SignUp from '../SignUp/signup';
import {NavigationBar} from '../App/navigationbar';
import {Jumbotron} from '../App/Jumbotron';
import {Layout} from '../App/layout';
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
    this.onLogoutClickHandler = this.onLogoutClickHandler.bind(this);
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
            this.props.history.push("/welcome");
          }
          else{
            this.setState({
              isLoading: false
            });
            this.props.history.push("/welcome");
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
    const obj = getFromStorage('main_app_key');
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
            setInStorage('main_app_key',obj);
          }
          else{
            this.setState({
              isLoading: false
            });
            this.props.history.push("/welcome");
          }
        });
    }
    else{
      //No token
      this.setState({
        isLoading: false
      });
      this.props.history.push("/welcome");
    }
  }

  render() {
    const {
      isLoading,
      token,
    } = this.state;
    if(isLoading){
      return(<p>Loading...</p>);
    }
    if(token){
      return(
        <React.Fragment>
        <NavigationBar isLoggedIn={true} logOutButtonClick={this.onLogoutClickHandler}/>
        <Jumbotron isLoggedIn={true} firstName={this.props.location.state.userfirstname}/>
        <Layout>
        <div>
        </div>
        </Layout>
        </React.Fragment>
      );
    }
    else{
      return(<div></div>);
    }
  }
}

export default Home;
