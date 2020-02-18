import React from 'react';

import classes from './DrawerToggle.module.css';

const drawerToggle = props => (
    <div className={ classes.CheeseburgerMenu } onClick={ props.click }>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;
