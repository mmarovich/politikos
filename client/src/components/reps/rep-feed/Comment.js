import React, { Component } from 'react';

import '../../../../styles/Comment.css';
import moment from 'moment';

moment.locale('en');

class Comment extends Component {

    render() {
        console.log(this.props.item)
        return(
            <div className="comment">
                <p><b>{this.props.item.username + ": "} </b></p><br />
                <p>{this.props.item.comment}</p><br />
                <div className="timeStamp" >{moment(this.props.item.date, 'LLLL').fromNow()}</div>
            </div>
        )
    }
}

export default Comment;