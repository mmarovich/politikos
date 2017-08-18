import React, { Component } from 'react'

import './BlogPost.css'

export default class BlogPost extends Component {
    render() {
        return (
            <div className="post-container">
                <h2 className="blog-title">{this.props.content.title}</h2>
                <div className="timeStamp-container">
                    <p>{this.props.content.date}</p>
                </div>
                <div className="blogBody-container">
                    <p>{this.props.content.body1}</p>
                    <p>{this.props.content.body2 ? this.props.content.body2 : null}</p>
                    <p>{this.props.content.body3 ? this.props.content.body3 : null}</p>
                    <p>{this.props.content.body4 ? this.props.content.body4 : null}</p>
                    <p>{this.props.content.body5 ? this.props.content.body5 : null}</p>
                </div>
                <div className="signed-container">
                    <p>--{this.props.content.author}</p>
                </div>
            </div>
        )
    }
}