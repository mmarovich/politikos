import React, { Component } from 'react';
import { connect } from 'react-redux';

import store from '../store';
import * as actions from '../actions/index';
import '../../styles/Account.css';

class Account extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.profileUpdate = this.profileUpdate.bind(this);
        this.yourLocation = this.yourLocation.bind(this);
        this.getDataFromApi = this.getDataFromApi.bind(this);
        this.locationChange = this.locationChange.bind(this)

        this.state = {
            location: ''
        }
    }

    profileUpdate(data) {
		return fetch('/api/location/' + this.props.id, {
			method: "PUT",
			headers: {
                'Content-Type': "application/json"
            },
			body: JSON.stringify({
                    location: data.normalizedInput
			})
        })
        .then(response => response.json())
        .then(location => {
            return store.dispatch(actions.profileUpdate(location))   
        })
        .catch(error => console.log(error));
    }

    getDataFromApi(location, callback) {
		return fetch(`https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBHdO7zr6FV-xa61nSLaUelzzwkzlU2yN8&address=${location}`)
        .then(response => response.json())
        .then(data => {
            this.setState({ location: '' })
            this.profileUpdate(data);
            return store.dispatch(actions.repsUpdate(data))   
        })
        .catch(error => console.log(error));
    }

    onSubmit(e) {
        e.preventDefault();
        this.getDataFromApi(this.state.location);
    }

    locationChange(e) {
        this.setState({ location: e.target.value })
    }

    yourLocation() {
        if (!this.props.location) {
            return <div className="yourLocation"><p>Please set your location</p></div>;
        }
        if (this.props.location) {
            return <div className="yourLocation"><p>{'Location set to: ' + this.props.location.city + ", " + this.props.location.state}</p></div>
        }
    }

    render () {
    return (
        <div className="account-container">
            <h1>Account</h1>

            <form className="account" onSubmit={this.onSubmit}>
                <label htmlFor="location">Location: </label>
                <p>(enter address and/or city/state)</p>
                <input id="location" type="text" name="location" 
                    onChange={this.locationChange} value={this.state.location} required />
                    {this.yourLocation()} <br />
                <button className="account-save" type="submit" value="Submit">Save</button>
		    </form>
        </div>
    )}
}

const mapStateToProps = (state, props) => ({
    id: state.user.userInfo.id,
    location: state.user.userInfo.location,
    reps: state.user.Representatives
})

export default connect(mapStateToProps)(Account);