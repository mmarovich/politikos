import React, { Component } from 'react'

import '../../styles/Contact.css'

export default class Contact extends Component {
    render() {
        return(
            <div className="contact-container">
                <h3>Questions? Suggestions? Concerns?</h3>
                <p>email: <a href="mailto:politikosservice@gmail.com">politikosservice@gmail.com</a></p>
            </div>
        )
    }
}