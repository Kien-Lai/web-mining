import React, { Component } from 'react';
import './App.css';
import InformationFrame from './component/InformationFrame';
import Music from 'react-icons/lib/fa/music';
import LazyLoad from 'react-lazyload';
import Login from './component/Login';
import { host } from './config';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user_id: "",
      password: "",
    }
    this.username = this.username.bind(this);
    this.password = this.password.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  username(e){
    this.setState({
      user_id: e.target.value,
    })
  }

  password(e){
    this.setState({
      password: e.target.value,
    })
  }

  login(){
    let link = 'http://'+host+'/api/login';
    let data = {
      user_id: this.state.user_id,
      password: this.state.password,
    }
    console.log(data);
    fetch(link, {
      body: JSON.stringify(data), // must match 'Content-Type' header
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
    })
    .then(success => {
      console.log(success);
      return success.json()
    })
    .then(data => {
      if(data.status === 1){
        alert("Login Successful");
      } else {
        alert("Login Failed");
      }
    });

  }

  logout(){
    let link = 'http://'+host+'/api/logout';
    fetch(link)
    .then(success => success.json())
    .then(data => {
      alert("Logout Successful");
    })
  }

  render() {
    return (
      <div className="app">
      <Login 
        username={this.username}
        password={this.password}
        login={this.login}
        logout={this.logout}
      />
        <div className="title">
          <h1 id="find-a-docter"><Music size={32}/> FIND A SONG !</h1>
          <h3 id="supply-medicine">Enhancing music eperience for everyone</h3>
          <div className="frame-wrap">
            <LazyLoad>
              <InformationFrame />
            </LazyLoad>  
          </div>  
        </div>  
      </div>
    );
  }
}

export default App;
