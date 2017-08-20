import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/Signup.css';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.createNewUser = this.createNewUser.bind(this);
        this.usernameChange = this.usernameChange.bind(this)
        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.checkAllFields = this.checkAllFields.bind(this);

        this.state = {
            username: '',
            email: '',
            password: '',
            msg: ''
        }
    }

    createNewUser(username, email, password) {
        return fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.msg) {
                    this.setState({ msg: data.msg })
                    return data;
                } else {
                    this.setState({ msg: '' })
                    return data;
                }
            })
            .then(data => {
                if (!data.msg) {
                    this.setState({ msg: `You've successfully created an account. Redirecting to login page...`})
                    setTimeout(() => {
                        this.props.history.push('/login')
                    }, 3000)
                } else {
                    return;
                }
            })
            .catch(error => console.log(error));
    }

    usernameChange(e) {
        this.setState({ username: e.target.value })
        const usernameTest = /^[a-zA-Z0-9]{6,20}$/.test(e.target.value)
        if (!usernameTest) {
            this.setState({ msg: 'username must be alphanumeric, between 6-20 characters' })
        } else {
            this.setState({ msg: '' })
        }
    }

    emailChange(e) {
        this.setState({ email: e.target.value })
        const emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value)
        if (!emailTest) {
            this.setState({ msg: 'must be a valid email address' })
        } else {
            this.setState({ msg: '' })
        }
    }

    passwordChange(e) {
        this.setState({ password: e.target.value })
        const passwordTest = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/.test(e.target.value)
        if (!passwordTest) {
            this.setState({ msg: 'password must be at least 8 characters long, include 1 uppercase and lowercase letter, and 1 numeric digit' })
        } else {
            this.setState({ msg: '' })
        }
    }


        checkAllFields(e) {
            const usernameTest = /^[a-zA-Z0-9]{6,20}$/
            const emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            const passwordTest = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/
            if (!usernameTest.test(this.state.username)) {
                this.setState({ msg: 'username must be alphanumeric, between 6-20 characters' })
            }
            if (!emailTest.test(this.state.email)) {
                this.setState({ msg: 'must be a valid email address'})
            }
            if (!passwordTest.test(this.state.password)) {
                this.setState({ msg: 'password must be at least 8 characters long, include 1 uppercase and lowercase letter, and 1 numeric digit' })
            }
            if (usernameTest.test(this.state.username) && emailTest.test(this.state.email) && passwordTest.test(this.state.password)) {
                this.setState({ msg: ''})
                this.createNewUser(this.state.username, this.state.email, this.state.password)
            }
        }

        onSubmit(e) {
            e.preventDefault();
            this.checkAllFields()
        }


        render() {
            return (
                <div className="signup-container">
                    <form className="createAccount" onSubmit={this.onSubmit}>
                        <h3>Sign Up</h3>
                        <label htmlFor="username">Username </label>
                        <input id="username" type="text" name="username"
                            onChange={this.usernameChange} value={this.state.username} required /><br />
                        <label htmlFor="email">Email </label>
                        <input id="email" type="text" name="email"
                            onChange={this.emailChange} value={this.state.email} required /><br />
                        <label htmlFor="password">Password </label>
                        <input id="password" type="password" name="password"
                            onChange={this.passwordChange} value={this.state.password} required /><br />
                        <div className="message">{this.state.msg}</div>
                        <button className="signup-button" type="submit" value="Submit">Sign Up</button>
                    </form>

                    <p>Already have an account? <Link to="/login">Log in here</Link></p>
                </div>
            )
        }
    }

    export default Signup;