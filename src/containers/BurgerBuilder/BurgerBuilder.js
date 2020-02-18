import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    };

    addIngredientHandler = type => {
        this._editIngredientHandler(type, INGREDIENT_PRICES[type]);
    }

    removeIngredientHandler = type => {
        this._editIngredientHandler(type, -INGREDIENT_PRICES[type]);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.setState({ purchasing: false });
        alert("Continuing.");
    }

    _editIngredientHandler = (type, price) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0 && price < 0) {
            return;
        }

        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = price < 0 ? oldCount-1 : oldCount+1;
        
        const newPrice = this.state.totalPrice + price;
        
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        });

        this._updatePurchaseState(updatedIngredients);
    }

    _updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(key => ingredients[key]).reduce((sum, el) => sum+el, 0);
        this.setState({ purchasable: sum > 0 });
    }

    render() {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <React.Fragment>
                <Modal show={ this.state.purchasing } modalClosed={ this.purchaseCancelHandler }>
                    <OrderSummary
                        ingredients={ this.state.ingredients }
                        canceled={ this.purchaseCancelHandler }
                        continue={ this.purchaseContinueHandler }
                        price={ this.state.totalPrice }
                    />
                </Modal>
                <Burger ingredients={ this.state.ingredients } />
                <BuildControls
                    ingredientAdded={ this.addIngredientHandler }
                    ingredientRemoved={ this.removeIngredientHandler }
                    disabled={ disabledInfo }
                    purchasable={ this.state.purchasable }
                    price={ this.state.totalPrice }
                    order={ this.purchaseHandler }
                />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;
