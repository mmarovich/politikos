import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import '../../../../styles/Post.css';
import CommentBox from './CommentBox';
import Comment from './Comment';
import FactCheck from './FactCheck';

class Post extends Component {

    render() {
        const comments = this.props.item.comments ? this.props.item.comments.map((item, key) => {
            return <Comment item={item} key={key} />
        }) : null;
        return (
            <div className="post">
                <div className="posted-headline"><ReactMarkdown source={this.props.item.headline ? this.props.item.headline : ""} /></div>
                <div className="posted-link"><ReactMarkdown source={`[${this.props.item.link}](${this.props.item.link})`} /></div>
                <div className="postedBy"><p>Posted by {this.props.item.username} on {this.props.item.date}</p></div>
                <div className="comments-container">{comments}</div>
                <hr />
                <FactCheck item={this.props.item} postNum={this.props.postNum}/>
                <CommentBox item={this.props.item} postNum={this.props.postNum}/>
            </div>
        )
    }
}

export default Post;