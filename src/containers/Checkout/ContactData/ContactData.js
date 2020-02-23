import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import {checkValidity} from '../../../shared/validation';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

import classes from './ContactData.module.css';

class ContactData extends Component {

    state = {
        orderForm: {
            name: this._makeInput('text', 'Your Name', {required: true}),
            street: this._makeInput('text', 'Street'),
            zipCode: this._makeInput('text', 'Zip', {
                required: true,
                minLength: 5,
                maxLength: 5,
            }),
            country: this._makeInput('text', 'Country'),
            email: this._makeInput('email', 'Your Email'),
            deliverMethod: this._makeSelect('fastest', [
                {value: 'fastest', displayValue: 'Fastest'},
                {value: 'cheapest', displayValue: 'Cheapest'},
            ]),
        },
        formIsValid: false,
    };

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let item in this.state.orderForm) {
            formData[item] = this.state.orderForm[item].value;
        }
        const orderData = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId,
        };

        this.props.onOrderBurger(orderData, this.props.token);
    }

    inputChangedHandler = (event, inputId) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormEl = {...updatedOrderForm[inputId]};
        updatedFormEl.value = event.target.value;
        updatedFormEl.touched = true;
        updatedFormEl.valid = checkValidity(updatedFormEl.value, updatedFormEl.validation);
        updatedOrderForm[inputId] = updatedFormEl;

        let formIsValid = true;
        for (let item in updatedOrderForm) {
            formIsValid = updatedOrderForm[item].valid;
            if (!formIsValid) {
                break;
            }
        }
        this.setState({orderForm: updatedOrderForm, formIsValid});
    }

    _makeInput(type, placeholder, validation = null) {
        return this._makeFormEl('input', '', { type, placeholder }, validation);
    }

    _makeSelect(defaultValue, options, validation = null) {
        return this._makeFormEl('select', defaultValue, { options }, validation);
    }

    _makeFormEl(elementType, value, elementConfig, validation) {
        return {
            elementType,
            elementConfig,
            value,
            validation,
            valid: elementType === 'select',
            touched: false,
        };
    }

    render() {

        let form = null;
        if (this.props.loading) {
            form = <Spinner />;
        } else {
            const formElementsArray = [];
            for (let key in this.state.orderForm) {
                formElementsArray.push({
                    id: key,
                    config: this.state.orderForm[key],
                });
            }

            form = (
                <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(item => (
                        <Input
                            key={item.id}
                            elementType={item.config.elementType}
                            elementConfig={item.config.elementConfig}
                            value={item.config.value}
                            invalid={item.config.valid === false}
                            shouldValidate={item.config.validation && item.config.touched}
                            changed={(event) => this.inputChangedHandler(event, item.id)}
                        />
                    ))}
                    <Button buttonType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                </form>
            );
        }
        return (
            <div className={classes.ContactData}>
                <h4>Contact Information</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
