import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = props => {

    let ingredients = [];
    for (const item in props.ingredients) {

        let qty = props.ingredients[item];
        if (qty > 0) {

            for (let i = 0; i < qty; i++) {
                ingredients[ingredients.length] = <BurgerIngredient key={ item + i } type={ item } />;
            }

        }

    }

    // const transformedIngredients = Object.keys(props.ingredients)
    //     .map(ingredient => {

    //         const qty = props.ingredients[ingredient];
    //         return [...Array(qty)].map(( _, index ) => {
    //             return <BurgerIngredient key={ ingredient + index } type={ ingredient } />;
    //         });

    //     })
    //     .reduce((arr, el) => {
    //         return arr.concat(el);
    //     }, []);

    if (ingredients.length === 0) {
        ingredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={ classes.Burger }>
            <BurgerIngredient type="bread-top" />
            { ingredients }
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;
