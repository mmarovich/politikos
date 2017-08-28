import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';

import '../../../../styles/Post.css';
import CommentBox from './CommentBox';
import Comment from './Comment';
import FactCheck from './FactCheck';
import store from '../../../store';
import * as actions from '../../../actions/index';

class Post extends Component {

    deletePost(postId, postNum) {
        return fetch(`/api/delete-post/${postId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'                
            }
        })
            .then(response => response.json())
            .then(msg => {
                console.log(msg)
                return store.dispatch(actions.deletePost(postNum))
            })
            .catch(error => console.log(error))
    }

    render() {
        const comments = this.props.item.comments ? this.props.item.comments.map((item, key) => {
            return <Comment item={item} key={key} />
        }) : null;

        if (this.props.item.username === this.props.userInfo.username) {
            return (
                <div className="post">
                    <div className="delete-button-container"><button className="delete-button" onClick={() => this.deletePost(this.props.item._id, this.props.postNum)}>Delete</button></div>
                    <div className="posted-headline"><ReactMarkdown source={this.props.item.headline ? this.props.item.headline : ""} /></div>
                    <div className="posted-link"><ReactMarkdown source={`[${this.props.item.link}](${this.props.item.link})`} /></div>
                    <div className="postedBy"><p>Posted by {this.props.item.username} on {this.props.item.date}</p></div>
                    <div className="comments-container">{comments}</div>
                    <hr />
                    <FactCheck item={this.props.item} postNum={this.props.postNum} />
                    <CommentBox item={this.props.item} postNum={this.props.postNum} />
                </div>
            )
        } else {
            return (
                <div className="post">
                    <div className="posted-headline"><ReactMarkdown source={this.props.item.headline ? this.props.item.headline : ""} /></div>
                    <div className="posted-link"><ReactMarkdown source={`[${this.props.item.link}](${this.props.item.link})`} /></div>
                    <div className="postedBy"><p>Posted by {this.props.item.username} on {this.props.item.date}</p></div>
                    <div className="comments-container">{comments}</div>
                    <hr />
                    <FactCheck item={this.props.item} postNum={this.props.postNum} />
                    <CommentBox item={this.props.item} postNum={this.props.postNum} />
                </div>
            )
        }
    }
}

const mapStateToProps = (state, props) => ({
    userInfo: state.user.userInfo,
})

export default connect(mapStateToProps)(Post);