import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ScrollListener from 'react-scroll-listener';
import _ from 'lodash';

import '../../../../styles/RepFeed.css';
import store from '../../../store';
import * as actions from '../../../actions/index';
import FeedPostForm from './Feedpostform';
import Feed from './Feed';

// let scrollListener = new ScrollListener()

class RepFeed extends Component {
    constructor(props) {
        super(props)

        this.getRepFeed = this.getRepFeed.bind(this);
        this.listener = _.throttle(this.scrollListener, 200).bind(this);
        this.showFeed = this.showFeed.bind(this)

        this.state = {
            showFeed: false
        }
    }

    componentWillMount() {
        this.getRepFeed()
        this.attachScrollListener();
    }

    attachScrollListener() {
        window.addEventListener('scroll', this.listener);
        this.listener();
    }

    componentWillUnmount() {
        this.detachScrollListener();
        store.dispatch(actions.removeFeed({ feed: [] }))
    }

    detachScrollListener() {
        window.removeEventListener('scroll', this.listener);
    }

    scrollListener(e) {
        let windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        let body = document.body;
        let html = document.documentElement;
        let docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        let windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom / .99 >= docHeight) {
            this.getRepFeed()
        } else {
            return;
        }
    }

    showFeed() {
        setTimeout(() => {
            this.setState({showFeed: true})
        }, 200)
    }

    getRepFeed() {
        return fetch(`/api/rep/${this.props.pointer.party}/${this.props.pointer.name}/${Number(this.props.feed.length)}`)
            .then(response => {
                if (response.status === 204) {
                    return {feed: []}
                } else {
                    return response.json()
                }
            })
            .then((rep, id) => {
                console.log(rep)
                if (rep.feed.length === 0 && this.props.feed.length === 0) {
                    return store.dispatch(actions.feed([], rep.id))
                }
                if (rep.feed.length === 0 && this.props.feed.length > 0) {
                    this.showFeed()
                    return store.dispatch(actions.feed([], rep.id))
                }
                this.showFeed()
                return store.dispatch(actions.feed(rep.feed, rep.id))
            })
            .catch(error => {
                if (error) {
                    console.log(error);
                }
            })
    }

    render() {
        if (this.state.showFeed === false) {
            return (
                <div className="repFeed">
                    <div className="rep-header-container">
                        <h1 className="rep-header">{this.props.pointer.name}</h1>
                    </div>
                    <div className="rep-photo-container">
                        <img className="rep-photo" alt="representative" src={this.props.pointer.photoUrl} />
                    </div>
                    <div className="no-feed">
                        <p>Guess what?  No feed has been started for {this.props.pointer.name}. Be the first to post something!</p>
                    </div>
                    <FeedPostForm showFeed={this.showFeed}/>
                </div>
            )
        } else {
            return (
                <div className="repFeed">
                    <div className="rep-header-container">
                        <h1 className="rep-header">{this.props.pointer.name}</h1>
                    </div>
                    <div className="rep-photo-container">
                        <img className="rep-photo" alt="representative" src={this.props.pointer.photoUrl} />
                    </div>
                    <FeedPostForm showFeed={this.showFeed}/>
                    <Feed />
                </div>
            )
        }
    }
}

const mapStateToProps = (state, props) => ({
    pointer: state.user.pointer,
    feed: state.user.currentRepFeed.feed
})

export default connect(mapStateToProps)(RepFeed);