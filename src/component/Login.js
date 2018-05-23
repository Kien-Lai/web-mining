import React, { Component } from 'react';
import './login.css';
import Popup from "reactjs-popup";

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            username_signup: '',
            password_signup: '',
        }

        this.username_signup = this.username_signup.bind(this);
        this.password_signup = this.password_signup.bind(this);
    }

    username_signup(e){
        this.setState({
            username_signup: e.target.value
        })
    }

    password_signup(e){
        this.setState({
            password_signup: e.target.value
        })
    }

    render(){
        return (
            <div className="lg-wrapper">
                <input type="text" placeholder="username..." className="lg-input" onChange={this.props.username}/>
                <input type="text" placeholder="password..." className="lg-input" onChange={this.props.password}/>
                <button className="lg-btn" onClick={this.props.login}>Login</button>
                <button className="lg-btn" onClick={this.props.logout}>Logout</button>

                <Popup trigger={<button className="lg-btn-signup" >Signup</button>} position="bottom">
                    <input type='text' placeholder='username' className="lg-signup-input" onChange={this.username_signup}/>
                    <input type='text' placeholder='password' className="lg-signup-input" onChange={this.password_signup}/>
                    <button className="lg-signup-btn" onClick={() => {this.props.signup(this.state.username_signup, this.state.password_signup)}}>signup</button>
                </Popup>
            </div>   
        );
    }
}

export default Login;