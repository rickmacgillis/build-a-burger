import React from 'react';

import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.module.css';

const toolbar = props => (
    <header className={ classes.Toolbar }>
        <DrawerToggle click={ props.sideDrawerOpener } />
        <div className={ classes.Logo }>
            <Logo />
        </div>
        <nav className={ classes.DesktopOnly }>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;
