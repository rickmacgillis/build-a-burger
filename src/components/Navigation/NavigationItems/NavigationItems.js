import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = props => {
    let links = <NavigationItem link="/auth">Authenticate</NavigationItem>;
    if (props.isAuth) {
        links = (
            <React.Fragment>
                <NavigationItem link="/orders">Orders</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem>
            </React.Fragment>
        );
    }
    return (
        <ul className={ classes.NavigationItems }>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {links}
        </ul>
    );
};

export default navigationItems;
