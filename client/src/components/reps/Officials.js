import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../../../styles/Officials.css';
import store from '../../store';
import * as actions from '../../actions/index';

const hidden = {
    display: 'none'
};

const show = {

}

const inline = {
    display: 'inline-block',
    paddingRight: '5px'
}

class Officials extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        return store.dispatch(actions.currentRepFeed(this.props.officials[this.props.office]))
    }

    makeli(obj, index) {
        return <li key={index} style={obj.value ? obj.style : hidden}>{obj.value ? obj.value : ""}</li>
    }

    render() {

        const officeRef = this.props.officials[this.props.office]
        return (
            <div className="official" >
                <Link onClick={this.handleClick} to="/rep" >
                    <h3>
                        <span>{officeRef.name} </span>
                        <span>{officeRef.party ? `(${officeRef.party})` : ""}</span>
                    </h3>
                </Link>
                <h6>
                    <span>{officeRef.address ?
                        officeRef.address.map((address, index) => {
                            const arr = [
                                { value: address.line1, style: show },
                                { value: address.line2, style: show },
                                { value: address.city + ",", style: inline },
                                { value: address.state, style: inline },
                                { value: address.zip, style: inline }
                            ]
                            return (
                                <ul key={index}>Address:
                                {arr.map(this.makeli)}
                                </ul>
                            )
                        }) : ""}
                    </span>
                </h6>
                <h6>
                    <span>{officeRef.phones ?
                        officeRef.phones.map((number, index) => {
                            return <li key={index}>{number}</li>
                        }) : ""}
                    </span>
                </h6>
                <h6>
                    <span>{officeRef.urls ?
                        officeRef.urls.map((url, index) => {
                            return <li key={index}><a href={url}>Website</a></li>
                        }) : ""}
                    </span>
                </h6>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    officials: state.user.Representatives.officials,
})

export default connect(mapStateToProps)(Officials);