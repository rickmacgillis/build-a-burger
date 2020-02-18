import React, { Component } from 'react';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component{

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map((ingredient, index) => {
            return (
                <li key={ ingredient + index }>
                    <span style={ {textTransform: 'capitalize'} }>{ingredient}</span>: { this.props.ingredients[ingredient] }
                </li>
            );
        });
    
        return (
            <React.Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    { ingredientSummary }
                </ul>
                <p><strong>Total Price: { this.props.price.toFixed(2) } </strong></p>
                <p>Continue to checkout?</p>
                <Button clicked={ this.props.canceled } buttonType="Danger">CANCEL</Button>
                <Button clicked={ this.props.continue } buttonType="Success">CONTINUE</Button>
            </React.Fragment>
        );
    }

}

export default OrderSummary;
