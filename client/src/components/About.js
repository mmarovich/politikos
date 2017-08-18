import React, { Component } from 'react'

import '../../styles/About.css'

export default class About extends Component {
    render() {
        return(
            <div className="about-container">
                <div className="purpose">
                    <h3>Purpose</h3>
                    <p>The political climate in the USA has been steadily on the rise.  The country is split into a dichotomy
                        where facts and tolerance are pushed aside in favor of loyalty to one's political affiliation.
                        The leaders and representatives on a state and local level are truly failing to engage the
                        citizens that they represent.

                        Many are sickened by the constant lies and ambiguity that comes out of government, and often
                        this ambiguity leads to citizens becoming powerless and- hence- apathetic when it comes
                        time to vote.  It's difficult to be informed when conflicting information shoots inward from
                        all angles.

                        This website was made for the following reasons:
                    </p>
                    <ul>
                        <li>Users should be able to find their political representatives from a state to local level.</li>
                        <li>Users should be able to follow what their political representatives are doing.</li>
                        <li>Users should be able to collaborate and factcheck the information that is being given to them, as a practice.</li>
                        <li>Users should be able to communicate to their representatives what ought to be done to accurately represent them.</li>
                        <li>Users should be able to motivate and incentivize their politicians to act ethically inline with the citizens they represent.</li>
                    </ul>
                </div>
            </div>
        )
    }
}