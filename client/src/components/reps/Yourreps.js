import React, { Component } from 'react';

import CurrentSettings from './Currentsettings';
import RepsList from './Repslist';

class YourReps extends Component {
    render() {
        return (
            <div>
                <CurrentSettings />
                <RepsList />
            </div>
        )
    }
}

export default YourReps;