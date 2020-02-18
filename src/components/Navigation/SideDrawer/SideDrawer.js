import React from 'react';

import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.module.css';

const sideDrawer = props => {

    const attachedClasses = [ classes.SideDrawer, (props.open ? classes.Open : classes.Close) ];

    return (
        <React.Fragment>
            <Backdrop show={ props.open } click={ props.closed } />
            <div className={ attachedClasses.join(' ') }>
                <div className={ classes.Logo }>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;
