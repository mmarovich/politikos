import React, { Component } from 'react';
// import { Route, Redirect, Switch } from 'react-router-dom';
// import { connect } from 'react-redux';

import '../styles/App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Routes from './Routes';

class App extends Component {

  render() {
    return (
      <div className="App">
          <Header />
            <Routes />
          <Footer />

      </div>
    );
  }
}

export default App;