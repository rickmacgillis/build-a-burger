import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {...this.props.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Can't load ingredients...</p> : <Spinner />;
        if (this.props.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={ this.props.ingredients } />
                    <BuildControls
                        ingredientAdded={ this.props.onIngredientAdded }
                        ingredientRemoved={ this.props.onIngredientRemoved }
                        disabled={ disabledInfo }
                        purchasable={ this.props.totalIngredients > 0 }
                        price={ this.props.totalPrice }
                        order={ this.purchaseHandler }
                    />
                </React.Fragment>
            );

            orderSummary = <OrderSummary
                ingredients={ this.props.ingredients }
                canceled={ this.purchaseCancelHandler }
                continue={ this.purchaseContinueHandler }
                price={ this.props.totalPrice }
            />;
        }

        return (
            <React.Fragment>
                <Modal show={ this.state.purchasing } modalClosed={ this.purchaseCancelHandler }>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        totalIngredients: state.burgerBuilder.totalIngredients,
        error: state.burgerBuilder.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onIngredientAdded: ingredientName => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: ingredientName => dispatch(actions.removeIngredient(ingredientName)),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
