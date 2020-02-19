import React from 'react';

import classes from './Order.module.css';

const order = props => {

    const ingredients = [];
    for (const item in props.ingredients) {
        ingredients.push({
            name: item,
            amount: props.ingredients[item],
        });
    }

    const ingredientOutput = ingredients.map(item => {
        return <span key={item.name}>{item.name} ({item.amount}) </span>;
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>${(+props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;
