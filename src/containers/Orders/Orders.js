import React, {Component} from 'react';
import axios from '../../axios-orders';
import {connect}from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        if (this.props.loading) {
            return <Spinner />;
        }
        return this.props.orders.map(order => (
            <Order key={order.id} ingredients={order.ingredients} price={order.price} />
        ));
    }
}

const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
