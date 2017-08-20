import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    TiInfoLarge as InfoIcon,
    TiBook as BookIcon,
    TiContacts as ContactIcon
} from 'react-icons/lib/ti'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';

const styles = {
    footerIcon: {
        height: '25px',
        margin: 'auto'
    },
    link: {
        textAlign: 'center',
        width: '33%'
    }
}

class BottomNavigationExampleSimple extends Component {
    state = {
        selectedIndex: 0,
    };

    select = (index) => this.setState({ selectedIndex: index });

    render() {
        return (
            <BottomNavigation selectedIndex={this.state.selectedIndex}>
                <Link style={styles.link} to="/about">
                    <BottomNavigationItem
                        label="About"
                        icon={<InfoIcon style={styles.footerIcon} />}
                        onTouchTap={() => this.select(0)}
                    />
                </Link>
                <Link to="/blog">
                    <BottomNavigationItem
                        label="Blog"
                        icon={<BookIcon style={styles.footerIcon} />}
                        onTouchTap={() => this.select(1)}
                    />
                </Link>
                <Link to="/contact">
                    <BottomNavigationItem
                        label="Contact"
                        icon={<ContactIcon style={styles.footerIcon} />}
                        onTouchTap={() => this.select(2)}
                    />
                </Link>
            </BottomNavigation>
        );
    }
}

export default BottomNavigationExampleSimple;