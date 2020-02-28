import React, { Component } from 'react'
import { Redirect, Link, BrowserRouter } from 'react-router-dom'
import App from '../../App';
import './Login.scss';
import url from '../../utils/url'
import axios from 'axios'
import { apiPath } from '../../config.js'
import { toast, ToastContainer } from 'react-toastify';


export default class Login extends Component {

    constructor(props) {
        super(props);
        let loggedIn = false;
        this.state = {
            username: '',
            password: '',
            loggedIn
        }
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm(e) {
        this.setState({
            loggedIn: true
        });
        e.preventDefault();
        const { username, password } = this.state;
        //Login logic
        axios.post(apiPath + "UserAuthentication/authenticate", {
            UserID: 'Finn',
            LastName: 'Williams',
            FirstName: 'Williams',
            lastName: 'Williams',
            UserName: username,
            Password: password,
            Email: 'Williams',
            UserGroup: 'Williams',
            UserType: 'Williams',
            Token: 'Williams'
        })
            .then(response => {
                
                if (response.data.status.toUpperCase() === "SUCCESS") {
                    localStorage.setItem("token", response.data.token);
                    sessionStorage.setItem("token", response.data.token);
                    this.setState({
                        loggedIn: true
                    });
                }
            })
            .catch(err => {
                
                console.log(err.response);
                this.setState({
                    loggedIn: false
                });
                toast.error(err.response.data);
            });
    }

    render() {
        
        if (this.props.loggedIn) {
            return (
                <BrowserRouter>
                    <Link to="/" component={App} />
                </BrowserRouter>
            );
        }

        return (
            <div className="container">
                <div className="wrapper">
                    <form onSubmit={this.submitForm}>
                        <span className="login-title">CargoFlash Login</span>
                        <div className="input-wrapper">
                            <input className="input-box" type='text' placeholder='Username' name='username' value={this.state.username} onChange={this.onChange}></input>
                        </div>
                        <div className="input-wrapper">
                            <input className="input-box" type='password' placeholder='Password' name='password' value={this.state.password} onChange={this.onChange}></input>
                        </div>
                        <br></br>
                        <div className="login-btn-container">
                            <input className="login-btn" type='submit'></input>
                        </div>
                    </form>
                </div>
                <ToastContainer autoClose={5000} />
            </div>
        )
    }
}
