import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../../styles/Divisions.css';
import Offices from './Offices';

class Divisions extends Component {
    render() {
        const offices = (this.props.division.officeIndices ? 
            this.props.division.officeIndices.map((item, key) => {
            return (<Offices division={item} key={key} />)
        }) : <div>information currently unavailable.(why?)</div>)
        return(
            <div className='division'>
                <h1>{this.props.division.name}</h1>
                <div className="office-container">
                    {offices}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, props) => ({
    offices: state.user.Representatives.offices,
})

export default connect(mapStateToProps)(Divisions);