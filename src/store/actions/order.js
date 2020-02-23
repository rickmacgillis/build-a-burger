import * as actionTypes from './actionTypes';

export const purchaseInit = () => ({type: actionTypes.PURCHASE_INIT});
export const purchaseBurgerStart = () => ({type: actionTypes.PURCHASE_BURGER_START});
export const purchaseBurgerSuccess = (orderId, orderData) => ({type: actionTypes.PURCHASE_BURGER_SUCCESS, orderId, orderData});
export const purchaseBurgerFail = error => ({type: actionTypes.PURCHASE_BURGER_FAIL, error});
export const purchaseBurger = (orderData, token) => ({type: actionTypes.PURCHASE_BURGER_INIT, orderData, token});
export const fetchOrdersStart = () => ({type: actionTypes.FETCH_ORDERS_START});
export const fetchOrdersSuccess = orders => ({type: actionTypes.FETCH_ORDERS_SUCCESS, orders});
export const fetchOrdersFail = error => ({type: actionTypes.FETCH_ORDERS_FAIL, error});
export const fetchOrders = (token, userId) => ({type: actionTypes.FETCH_ORDERS_INIT, token, userId});
