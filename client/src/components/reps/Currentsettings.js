import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import '../../../styles/Currentsettings.css';
// import store from '../../store';
// import * as actions from '../../actions/index';

class CurrentSettings extends Component {
    render() {
        if (!this.props.reps) {
            return (
                <div>
                    <h4>Location: none</h4>
                </div>
            )
        } else {
            return (
                <div className="current-settings">
                    <Col className="set-location" xs={12} md={12} lg={12} >
                        <h4>Location: <p style={{marginRight: '3px'}}>{this.props.reps.normalizedInput.city ?
                            this.props.reps.normalizedInput.city + "," : ""} </p>
                            <p style={{marginRight: '3px'}}>{this.props.reps.normalizedInput.state ?
                                this.props.reps.normalizedInput.state : ""} </p>
                            <p>{this.props.reps.normalizedInput.zip ?
                                this.props.reps.normalizedInput.zip : ""}</p>
                        </h4>
                    </Col>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, props) => ({
    reps: state.user.Representatives
})

export default connect(mapStateToProps)(CurrentSettings);