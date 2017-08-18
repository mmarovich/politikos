import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { FaFlag as Flag } from 'react-icons/lib/fa'

import store from '../../store';
import * as actions from '../../actions/index';

import '../../../styles/Header.css';


const styles = {
  appBar: {
    zIndex: '0',
    padding: '0 30px 0 0',
    backgroundColor: 'rgba(144, 164, 174, 1)'
  },
  leftIcon: {
    display: 'none',
  },
  flag: {
    height: '40px',
    width: '40px',
    color: 'rgba(69, 90, 100, 1)'
  },
  headerButton: {
    border: '1px solid rgba(144, 164, 174, 1)',
    backgroundColor: 'rgba(69, 90, 100, 1)',
    fontFamily: "'Lora', serif"
  }
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    return store.dispatch(actions.logOut())
  }

  render() {
    if (!this.props.isLoggedIn) {
      return (
        <div>
          <AppBar
            style={styles.appBar}
            showMenuIconButton={true}
            titleStyle={{ lineHeight: 'normal' }}
            title={
              <Link style={{textDecoration: 'none'}} to="/">
                <div className="header-title-container">
                  <div className="header-title"><div>Politikos</div></div>
                  <div className="header-subtitle"><div>Be involved, educate, and influence</div></div>
                </div>
              </Link>
            }
            iconElementLeft={<Link style={{textDecoration: 'none'}} to="/"><Flag style={styles.flag} className="logo" /></Link>}
            iconStyleLeft={{ margin: '8px 8px 8px 8px' }}
            iconElementRight={
              <div>
                <Link to="/login"><RaisedButton
                  className="header-button"
                  buttonStyle={styles.headerButton}
                  label="Log In" />
                </Link>
                <RaisedButton
                  buttonStyle={styles.headerButton}
                  label="Menu" />
              </div>
            }
          />
        </div>
      )
    } else {
      return (
        <div>
          <AppBar
            style={styles.appBar}
            showMenuIconButton={true}
            titleStyle={{ lineHeight: 'normal' }}
            title={
              <Link style={{textDecoration: 'none'}} to="/">
                <div className="header-title-container">
                  <div className="header-title"><div>Politikos</div></div>
                </div>
              </Link>
            }
            iconElementLeft={<Link style={{textDecoration: 'none'}} to="/"><Flag style={styles.flag} className="logo" /></Link>}
            iconStyleLeft={{ margin: '8px' }}
            iconElementRight={
              <div>
                <Link to={this.props.reps ? "/your-reps" : "/account"}>
                  <RaisedButton
                    buttonStyle={styles.headerButton}
                    label="Your Reps" />
                </Link>
                <Link to="/account">
                  <RaisedButton
                    buttonStyle={styles.headerButton}
                    label="Account" />
                </Link>
                <RaisedButton
                  onClick={this.logOut}
                  buttonStyle={styles.headerButton}
                  style={{ marginLeft: '10px' }}
                  label="Log Out" />
              </div>
            }
          />
        </div>
      )
    }
  }
}

const mapStateToProps = (state, props) => ({
  isLoggedIn: state.user.isLoggedIn,
  reps: state.user.Representatives
})

export default connect(mapStateToProps)(Header);