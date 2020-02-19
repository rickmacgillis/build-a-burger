import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.css';

const checkoutSummary = props => {
    return (
        <div className={ classes.CheckoutSummary }>
            <h1>Please verify your order.</h1>
            <div className={ classes.Box }>
                <Burger ingredients={ props.ingredients } />
            </div>
            <Button buttonType="Danger" clicked={ props.checkoutCancel }>CANCEL</Button>
            <Button buttonType="Success" clicked={ props.checkoutContinue }>CONTINUE</Button>
        </div>
    );
};

export default checkoutSummary;
