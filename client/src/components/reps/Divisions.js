import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip'

import '../../../styles/Divisions.css';
import Offices from './Offices';

class Divisions extends Component {
    render() {
        const tooltip = `The information provided on this page is generated
        with the help of Google's Civic API.  The information is maintained
        and updated as much as possible, but government information will often
        be unavailable for many cities and small towns.`
        const offices = (this.props.division.officeIndices ? 
            this.props.division.officeIndices.map((item, key) => {
            return (<Offices division={item} key={key} />)
        }) : <div>information currently unavailable.<p data-tip={tooltip}>(why?)</p></div>)
        return(
            <div className='division'>
                <h1>{this.props.division.name}</h1>
                <div className="office-container">
                    {offices}
                </div>
                <ReactTooltip />
            </div>
        )
    }
}


const mapStateToProps = (state, props) => ({
    offices: state.user.Representatives.offices,
})

export default connect(mapStateToProps)(Divisions);