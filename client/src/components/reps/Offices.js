import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip'

import '../../../styles/Offices.css';
import Officials from './Officials';

class Offices extends Component {

    render() {
        const tooltip = `The information provided on this page is generated
        with the help of Google's Civic API.  The information is maintained
        and updated as much as possible, but government information will often
        be unavailable for many cities and small towns.`
        const divisionRef = this.props.offices[this.props.division]
        const officials = (divisionRef.officialIndices ?
            divisionRef.officialIndices.map((item, key) => {
                return (<Officials office={item} key={key} />)
        }) : <div>information currently unavailable.<p data-tip={tooltip}>(why?)</p></div>)
        return(
            <div className="office">
                <h2>{divisionRef.name}</h2>
                <div className="officials-container">
                    {officials}
                </div>
                <ReactTooltip />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    offices: state.user.Representatives.offices,
})

export default connect(mapStateToProps)(Offices);