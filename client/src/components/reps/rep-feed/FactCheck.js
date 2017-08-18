import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../../../styles/FactCheck.css';
import Percentages from './Percentages'

class FactCheck extends Component {
    constructor(props) {
        super(props)

        this.clickHandler = this.clickHandler.bind(this)
        this.renderPercentages = this.renderPercentages.bind(this)
        this.renderClickContainer = this.renderClickContainer.bind(this)

        this.state = {
            clicked: false
        }
    }

    clickHandler() {
        this.state.clicked === false ?
            this.setState({ clicked: true }) :
            this.setState({ clicked: false })
    }

    renderClickContainer() {
        if (this.state.clicked === true) {
            return <div className="click-container" onClick={this.clickHandler}></div>
        } else {
            return null;
        }
    }

    renderPercentages(yourVoteId) {
        if (this.state.clicked === true) {
            return <Percentages item={this.props.item} showVote={this.showVote} closePercentages={this.clickHandler} postNum={this.props.postNum} legitId={yourVoteId} />
        } else {
            return null;
        }
    }

    render() {
        const yourVoteIndex = this.props.item.legits.findIndex(i => i.username === this.props.username)
        if (yourVoteIndex === -1) {
            return (
                <div className="factCheck-container">
                    {this.renderClickContainer()}
                    {this.renderPercentages()}
                    <button className="fact-percentage" onClick={this.clickHandler} > Legitimacy</button >
                </div>
            )
        } else {
            const yourVote = this.props.item.legits[yourVoteIndex].vote
            const yourVoteId = this.props.item.legits[yourVoteIndex]._id
            return (
                <div className="factCheck-container">
                    {this.renderClickContainer()}
                    {this.renderPercentages(yourVoteId)}
                    <p>Your vote: {yourVote}% accurate</p>
                    <span><button className="fact-percentage" onClick={this.clickHandler} > Change Opinion</button ></span>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, props) => ({
    username: state.user.userInfo.username,
})

export default connect(mapStateToProps)(withRouter(FactCheck));