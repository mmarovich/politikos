import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
const SimpleMDE = require('react-simplemde-editor');

import '../../../../styles/Feedpostform.css';
import store from '../../../store';
import * as actions from '../../../actions/index';

moment.locale('en');

class FeedPostForm extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.feedPost = this.feedPost.bind(this)
        this.moment = moment().format('LLLL')
        this.headlineHandler = this.headlineHandler.bind(this)
        this.linkHandler = this.linkHandler.bind(this)
        this.makePost = this.makePost.bind(this)
        this.hidePost = this.hidePost.bind(this)

        this.state = {
            makePost: false,
            headline: "",
            link: ""
        }
    }

    feedPost(headline, link) {
        return fetch('/api/feedpost', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.props.rep.name,
                party: this.props.rep.party,
                username: this.props.username,
                headline: headline,
                link: link
            })
        })
            .then(response => response.json())
            .then(newPost => {
                console.log(newPost)
                this.setState({ makePost: false, headline: "", link: "" })
                this.props.showFeed()
                return store.dispatch(actions.feedUpdate(newPost))
            })
            .catch(error => console.log(error))
    }

    onSubmit(e) {
        e.preventDefault()
        const headline = this.state.headline
        const link = this.state.link
        this.feedPost(headline, link)
    }

    headlineHandler(value) {
        this.setState({ headline: value })// let simplemde = new SimpleMDE({ element: document.getElementById(e.target.id) });
    }

    linkHandler(e) {
        this.setState({ link: e.target.value })
    }

    makePost() {
        this.setState({ makePost: true })
    }

    hidePost() {
        this.setState({ makePost: false })
    }

    render() {
        if (this.state.makePost === true) {
            return (
                <div className="postform-container">
                    <button className="post-button" onClick={this.hidePost}>Hide</button>
                    <form className="feedpostform" onSubmit={this.onSubmit}>
                        <label htmlFor="headlineField">Post Your News: </label><br />
                        <div className="text-area-container">
                            <SimpleMDE
                                onChange={this.headlineHandler}
                                value={this.state.headline}
                                options={{
                                    autofocus: false,
                                    spellChecker: true,
                                    showIcons: ['heading-1', 'heading-2', 'heading-3', 'horizontal-rule'],
                                    hideIcons: ['side-by-side'],
                                    placeholder: "What happened?"
                                }}
                            />
                        </div>
                        <input id="linkField" type="text" name="linkField"
                            placeholder="article link" onChange={this.linkHandler} value={this.state.link} required /> <br />
                        <button className="postIt-button" type="submit" value="Submit">Submit</button>
                    </form>
                </div>
            )
        } else {
            return(
                <div className="postform-container">
                    <button className="post-button" onClick={this.makePost}>Make A Post</button>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, props) => ({
    username: state.user.userInfo.username,
    postField: state.user.currentRepFeed.postField,
    rep: state.user.pointer
})

export default connect(mapStateToProps)(withRouter(FeedPostForm));