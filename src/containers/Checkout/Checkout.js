import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import ContactData from '../Checkout/ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state = {
        ingredients: {
            lettuce: 1,
            meat: 1,
            cheese: 1,
            bacon: 1,
        },
        totalPrice: 0,
    };

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                totalPrice = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        
        this.setState({ ingredients, totalPrice });
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancel={ this.checkoutCancelHandler }
                    checkoutContinue={ this.checkoutContinueHandler }
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={() => (
                        <ContactData
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice} {...this.props}
                        />
                    )}
                />
            </div>
        );
    }

}

export default Checkout;
