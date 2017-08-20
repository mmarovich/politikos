import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../styles/Login.css';
import store from '../store';
import * as actions from '../actions/index';


class Login extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.logIn = this.logIn.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.getDataFromApi = this.getDataFromApi.bind(this);

        this.state = {
            email: '',
            password: '',
            msg: ''
        }
    }

    getDataFromApi(location, callback) {
		return fetch(`https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBHdO7zr6FV-xa61nSLaUelzzwkzlU2yN8&address=${location}`)
        .then(response => response.json())
        .then(data => {
            return store.dispatch(actions.repsUpdate(data))   
        })
        .then(() => this.props.history.push('/your-reps'))
        .catch(error => console.log(error));
    }

    logIn(email, password) {
        return fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => {
            if (response.status === 403 || response.status === 404) {
                this.setState({ msg: 'Invalid Username or password'})
                return;
            }
            return response.json()
        }, (err) => console.log(err))
        .then(user => {
            console.log(user)
            return store.dispatch(actions.logIn({
                username: user.username,
                id: user._id,
                email: user.email,
                location: user.location ? user.location : null
            }))
        })
        .then(user => {
            if (user.userInfo.location === null) {
                return this.props.history.push('/account');
            }
            let location = user.userInfo.location.line1 + " " + user.userInfo.location.city + ", " + user.userInfo.location.state + " " + user.userInfo.location.zip || "";       
            this.getDataFromApi(location);
        })
        // .then(() => this.props.history.push('/account'))
        .catch(error => console.log(error));
        
    }

    emailChange(e) {
        this.setState({ email: e.target.value })
    }

    passwordChange(e) {
        this.setState({ password: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        this.logIn(email, password);
    }

    render() {
        return (
            <div className="login-container">
                <form className="logIn" onSubmit={this.onSubmit}>
                    <h3>Log In</h3>
                    <label htmlFor="email">Email </label>
                    <input id="email" type="text" name="email"
                        onChange={this.emailChange} value={this.state.email} required /><br />
                    <label htmlFor="password">Password </label>
                    <input id="password" type="password" name="password"
                        onChange={this.passwordChange} value={this.state.password} required /><br />
                    <div className="message">{this.state.msg}</div>
                    <button className="login-button" type="submit" value="Submit">Log In</button>
                </form>

                <p>Need an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    isloggedIn: state.isloggedIn,
    userInfo: state.user.userInfo,
})

export default connect(mapStateToProps)(withRouter(Login));