import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../../../styles/Feed.css';
import Post from './Post'

class Feed extends Component {

    render() {
        const feed = this.props.feed ? this.props.feed.map((item, key) => {
            return <Post item={item} key={key} postNum={key} />
        }) : <p>No one has posted yet</p>
        return(
            <div className="feed-container">
                {feed}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    feed: state.user.currentRepFeed.feed
})

export default connect(mapStateToProps)(withRouter(Feed));