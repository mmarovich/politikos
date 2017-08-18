import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../../../styles/CommentBox.css';
import store from '../../../store';
import * as actions from '../../../actions/index';

class CommentBox extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.commentOnPost = this.commentOnPost.bind(this)
        this.postComment = this.postComment.bind(this)
        this.commentHandler = this.commentHandler.bind(this);

        this.state = {
            comment: ""
        }
    }

    postComment(postId, post) {
        this.setState({ comment: ""})
        return store.dispatch(actions.postComment(postId, post))
    }

    commentOnPost(username, postId, comment) {
        return fetch(`/api/comment`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                postId: postId,
                comment: comment
            })
        })
        .then(response => response.json())
        .then(post => {
            this.postComment(this.props.postNum, post)
        })
        .catch(error => console.log(error))
    }

    onSubmit(e) {
        e.preventDefault()
        
        const postId = this.props.item._id
        const username = this.props.username
        const comment = this.state.comment
        console.log(this.props.postNum)
        this.commentOnPost(username, postId, comment)
    }

    commentHandler(e) {
        this.setState({ comment: e.target.value })
    }


    render() {
        return (
            <div className="commentBox-container">
                <form className="commentBox" onSubmit={this.onSubmit}>
                    <label htmlFor="comment"></label><br />
                    <textarea id="comment" type="text" name="comment"
                        placeholder="write a comment..." onChange={this.commentHandler} value={this.state.comment} required />
                    <button className="comment-button" type="submit" value="Submit">Comment</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    rep: state.user.pointer,
    feed: state.user.currentRepFeed.feed,
    username: state.user.userInfo.username
})

export default connect(mapStateToProps)(withRouter(CommentBox));