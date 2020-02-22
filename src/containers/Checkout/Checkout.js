import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        if (this.props.ingredients && this.props.purchased === false) {
            return (<div>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    checkoutCancel={ this.checkoutCancelHandler }
                    checkoutContinue={ this.checkoutContinueHandler }
                />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>);
        }
        return <Redirect to="/" />;
    }

}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
});

export default connect(mapStateToProps)(Checkout);
