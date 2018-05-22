import React, { Component } from 'react';
import './login.css';

class Login extends Component {
    render(){
        return (
            <div className="lg-wrapper">
                <input type="text" placeholder="username..." className="lg-input" onChange={this.props.username}/>
                <input type="text" placeholder="password..." className="lg-input" onChange={this.props.password}/>
                <button className="lg-btn" onClick={this.props.login}>Login</button>
                <button className="lg-btn" onClick={this.props.logout}>Logout</button>
            </div>   
        );
    }
}

export default Login;