import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Landing from './components/Landing';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';
import Blog from './components/blog/Blog';
import Contact from './components/Contact';
import Account from './components/Account';
import YourReps from './components/reps/Yourreps';
import RepFeed from './components/reps/rep-feed/RepFeed';
import './Routes.css';

const ConnectedSwitch = connect(state => ({
    location: state.router.location
}))(Switch)

class Routes extends Component {
    render() {
        return (
            <div className="routes-container">
                <ConnectedSwitch>
                    <Route path="/" exact component={Landing} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/about" exact component={About} />
                    <Route path="/blog" exact component={Blog} />
                    <Route path="/contact" exact component={Contact} />
                    <Route path="/account" exact render={() => (
                        this.props.isLoggedIn ? <Account /> :
                            <Redirect to="/login" />
                    )} />
                    <Route path="/your-reps" exact render={() => (
                        this.props.isLoggedIn ? <YourReps /> :
                            <Redirect to="/login" />
                    )} />
                    <Route path="/rep" exact render={() => (
                        this.props.isLoggedIn ? <RepFeed /> :
                            <Redirect to="/login" />
                    )} />
                </ConnectedSwitch>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    isLoggedIn: state.user.isLoggedIn,
})

export default connect(mapStateToProps)(Routes);