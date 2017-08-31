import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../../../styles/Comment.css';
import moment from 'moment';
import store from '../../../store';
import * as actions from '../../../actions/index';

moment.locale('en');

class Comment extends Component {

    deleteComment(commentId, postId, postNum) {
        return fetch(`/api/delete-comment/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                commentId, postId
            })
        })
            .then(response => response.json())
            .then(newPost => {
                return store.dispatch(actions.deleteComment(newPost, postNum))
            })
            .catch(error => console.log(error))
    }

    render() {
        if (this.props.item.username === this.props.userInfo.username) {
            return (
                <div className="comment">
                    <div className="delete-comment-container">
                        <button className="delete-comment-button" onClick={() => this.deleteComment(this.props.item._id, this.props.postId, this.props.postNum)}>Delete</button>
                    </div>
                    <p><b>{this.props.item.username + ": "} </b></p><br />
                    <p>{this.props.item.comment}</p><br />
                    <div className="timeStamp" >{moment(this.props.item.date, 'LLLL').fromNow()}</div>
                </div>
            )
        } else {
            return (
                <div className="comment">
                    <p><b>{this.props.item.username + ": "} </b></p><br />
                    <p>{this.props.item.comment}</p><br />
                    <div className="timeStamp" >{moment(this.props.item.date, 'LLLL').fromNow()}</div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, props) => ({
    userInfo: state.user.userInfo,
})

export default connect(mapStateToProps)(Comment);