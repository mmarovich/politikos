import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../../../styles/Percentages.css';
import store from '../../../store';
import * as actions from '../../../actions/index';

class Percentages extends Component {
    constructor(props) {
        super(props)

        this.clickHandler = this.clickHandler.bind(this)
        this.postLegit = this.postLegit.bind(this)
    }

    postLegit(postId,username,value,legitId) {
        console.log(postId,username,value,legitId)
        return fetch('/api/postLegit', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId,username,value,legitId
            })
        })
        .then(response => response.json())
        .then(post => {
            this.props.closePercentages()
            return store.dispatch(actions.postUpdate(post, this.props.postNum))
        })
        .catch(error => console.log(error))
    }

    clickHandler(e) {
        let legitId = this.props.legitId || null
        let postId = this.props.item._id
        let username = this.props.username
        let value = e.target.value
        console.log(postId, username, value)
        this.postLegit(postId,username,value,legitId)
    }

    render() {
        return (
            <div className="percentages-container">
                <ul className="percentages-list">
                    <li
                        onClick={this.clickHandler}
                        value="10">10%</li>
                    <li
                        onClick={this.clickHandler}
                        value="20">20%</li>
                    <li
                        onClick={this.clickHandler}
                        value="30">30%</li>
                    <li
                        onClick={this.clickHandler}
                        value="40">40%</li>
                    <li
                        onClick={this.clickHandler}
                        value="50">50%</li>
                    <li
                        onClick={this.clickHandler}
                        value="60">60%</li>
                    <li
                        onClick={this.clickHandler}
                        value="70">70%</li>
                    <li
                        onClick={this.clickHandler}
                        value="80">80%</li>
                    <li
                        onClick={this.clickHandler}
                        value="90">90%</li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    username: state.user.userInfo.username,
})

export default connect(mapStateToProps)(withRouter(Percentages));