import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../../styles/Offices.css';
import Officials from './Officials';

class Offices extends Component {

    render() {
        const divisionRef = this.props.offices[this.props.division]
        const officials = (divisionRef.officialIndices ?
            divisionRef.officialIndices.map((item, key) => {
                return (<Officials office={item} key={key} />)
        }) : <div>information currently unavailable.(why?)</div>)
        return(
            <div className="office">
                <h2>{divisionRef.name}</h2>
                <div className="officials-container">
                    {officials}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    offices: state.user.Representatives.offices,
})

export default connect(mapStateToProps)(Offices);