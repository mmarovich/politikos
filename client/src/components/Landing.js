import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/Landing.css';

class Landing extends Component {
    render() {
        return (
            <div className="landing-container">
                <div className="introduction-container">
                    <h4>Introducing</h4>
                    <h1>Politikos</h1>
                    <h5>
                        Welcome to Politikos, your resource for tracking and collaborating on your respresentatives.
                        Here you can learn who your representatives are in a federal, state, and local level. You can
                        collaborate on everything that they do and help to educate yourself and others.
                    </h5>
                </div>

                <Link to="/signup"><button className="signup-button">Signup</button></Link>
                <Link to="/login"><button className="login-button">Login</button></Link>
            </div>
        )
    }
}

export default Landing;