import React, { Component } from 'react'

import './Blog.css'
import BlogPost from './BlogPost'
import postArray from './posts'



export default class Blog extends Component {

    render() {

        const posts = postArray.map((post, key) => {
            return <BlogPost content={post} key={key} />
        })
        return (
            <div className="blog-container">
                {posts}
            </div>
        )
    }
}