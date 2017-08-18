import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../../styles/Repslist.css';
import Divisions from './Divisions';

class RepsList extends Component {

    render () {
        if (!this.props.location) {
            return (
                <div>
                    <p>Please <Link to="/account">enter location</Link> for representative information.</p>
                </div>
            )
        } else {
            const divisions = Object.keys(this.props.reps.divisions).map((item, key) => {
                return (<Divisions division={this.props.reps.divisions[item]} key={key} id={key} />)
            })
            return (
                <div className="divisions-container">
                    {divisions}
                </div>
            )
        }
    }
}

const mapStateToProps = (state, props) => ({
    location: state.user.userInfo.location,
    reps: state.user.Representatives
})

export default connect(mapStateToProps)(RepsList);