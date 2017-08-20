import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import '../styles/App.css';
import Landing from './components/Landing';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';
import Blog from './components/blog/Blog';
import Contact from './components/Contact';
import EmailVerification from './components/EmailVerification';
import Account from './components/Account';
import YourReps from './components/reps/Yourreps';
import RepFeed from './components/reps/rep-feed/RepFeed';

const ConnectedSwitch = connect(state => ({
  location: state.router.location
}))(Switch)

class App extends Component {

  render() {
    return (
      <div className="App">
          <Header />
          <ConnectedSwitch>
            <Route path="/" exact component={Landing} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <Route path="/about" exact component={About} />
            <Route path="/blog" exact component={Blog} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/email-verification" component={EmailVerification} />
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
          <Footer />

      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  isLoggedIn: state.user.isLoggedIn,
})

export default connect(mapStateToProps)(App);